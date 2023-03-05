import { Request, Response } from 'express';
import { DEFAULT_ERROR_MESSAGE, FAILURE, SUCCESS } from '../constances/message';
import Comment from '../models/Comment';
import Feed from '../models/Feed';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { TTokenPayload } from '../types/user';

export const createComment = async (req: Request, res: Response) => {
  try {
    const { feedId, text, email } = req.body;

    const user = await User.findOne({ email });
    const username = user.username;

    if (!user) {
      return res.status(400).send({ message: FAILURE.CannotFindUser });
    }

    const feed = await Feed.findOne({ _id: feedId });

    if (!feed) {
      return res.status(400).send({ message: FAILURE.CannotFindFeed });
    }

    const newComment = await Comment.create({
      user,
      username,
      feed: feedId,
      text,
    });
    feed.comments.push(newComment._id);
    await feed.save();

    return res.status(200).send(newComment);
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { _id: commentId, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: FAILURE.CannotFindUser });
    }

    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      return res.status(400).send({ message: FAILURE.CannotFindComment });
    }

    const feed = await Feed.findOne({ comments: commentId });
    if (!feed) {
      return res.status(400).send({ message: FAILURE.CannotFindFeed });
    }

    if (user._id.toString() === comment.user.toString()) {
      await Comment.findByIdAndDelete(commentId);

      const newComments = feed.comments.filter((comment) => {
        return comment.toString() !== commentId.toString();
      });
      feed.comments = newComments;
      await feed.save();
    }

    return res.status(200).send({ message: SUCCESS.Ok });
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

export const editComment = async (req: Request, res: Response) => {
  try {
    const { chosenCommentId, editComment, email: reqUser } = req.body;

    const editReqUser = await User.findOne({ reqUser });

    if (!editReqUser) {
      return res.status(400).send({ message: FAILURE.CannotFindUser });
    }

    const token = req.headers.cookie?.split('refreshToken=')[1];
    if (!token) {
      return res.status(401).send({ message: FAILURE.InvalidToken });
    }
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const { email: loginUser } = payload as TTokenPayload;

    const user = await User.findOne({ loginUser });

    if (!user) {
      return res.status(400).send({ message: FAILURE.CannotFindUser });
    }

    if (editReqUser._id.toString() === user._id.toString()) {
      const updateComment = await Comment.findByIdAndUpdate(chosenCommentId, {
        text: editComment,
      });

      return res.status(200).send(updateComment);
    }
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};
