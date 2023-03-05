import { Request, Response } from 'express';
import { DEFAULT_ERROR_MESSAGE, FAILURE, SUCCESS } from '../constances/message';
import Comment from '../models/Comment';
import Feed from '../models/Feed';
import User from '../models/User';

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
