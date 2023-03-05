import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { DEFAULT_ERROR_MESSAGE, FAILURE, SUCCESS } from '../constances/message';
import Feed from '../models/Feed';
import jwt from 'jsonwebtoken';
import { TTokenPayload } from '../types/user';
import User from '../models/User';
import Like from '../models/Like';
import Comment from '../models/Comment';

export const getFeeds = async (req: Request, res: Response) => {
  try {
    const feeds = await Feed.find({})
      .sort({ createdAt: -1 })
      .populate('likes')
      .populate('comments');

    return res.status(200).send(feeds);
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

export const getFeed = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
    }

    const feed = await Feed.findById(id)
      .populate('likes')
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } },
      });

    return res.status(200).send(feed);
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

export const uploadFeed = async (req: Request, res: Response) => {
  try {
    const { title, text } = req.body;
    // req.file은 multer가 파일을 업로드 했을 때만 생성됨.
    // path는 optional하기 때문에 구조분해할당 불가
    const path = req.file?.path;
    const accessToken = req.headers.authorization.split('Bearer ')[1];

    if (!accessToken) {
      return res.status(401).send({ message: FAILURE.InvalidToken });
    }

    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const { email } = payload as TTokenPayload;
    const { _id } = await User.findOne({ email });

    const newFeed = await Feed.create({
      title,
      text,
      photo: path,
      owner: _id,
    });

    return res.status(200).send(newFeed);
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

export const updateFeed = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
    const file = req.file;
    const path = file && file.path;

    const feed = await Feed.findById(id);

    if (!feed) {
      return res.status(400).send({ message: FAILURE.UpdateFeed });
    }

    const updatedFeed = await Feed.findByIdAndUpdate(id, {
      title,
      text,
      photo: path,
    });

    return res.status(200).send(updatedFeed);
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

export const deleteFeed = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const feed = await Feed.findById(_id);

    if (!feed) {
      return res.sendStatus(400).send({ message: FAILURE.DeleteFeed });
    }

    feed.likes.forEach(async (likeId) => await Like.findByIdAndDelete(likeId));
    feed.comments.forEach(
      async (commentId) => await Comment.findByIdAndDelete(commentId)
    );
    await Feed.findByIdAndDelete(_id);

    return res.status(200).send(feed);
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

export const toggleLikeFeed = async (req: Request, res: Response) => {
  try {
    const { email, feedId } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: FAILURE.CannotFindUser });
    }

    const feed = await Feed.findOne({ _id: feedId });
    if (!feed) {
      return res.status(400).send({ message: FAILURE.CannotFindFeed });
    }

    const isLiked = await Like.findOne({ user: user._id, feed: feedId });

    if (isLiked) {
      const newLikes = feed.likes.filter(
        (item) => item.toString() !== isLiked._id.toString()
      );
      feed.likes = newLikes;
      await feed.save();
      await Like.deleteOne(isLiked._id);
    } else {
      const like = await Like.create({
        user,
        feed: feedId,
      });
      feed.likes.push(like._id);
      await feed.save();
    }

    return res.status(200).send({ message: SUCCESS.Ok });
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};
