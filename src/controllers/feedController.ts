import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { DEFAULT_ERROR_MESSAGE, FAILURE } from '../constances/message';
import Feed from '../models/Feed';

export const getFeeds = async (req: Request, res: Response) => {
  try {
    const feeds = await Feed.find({});
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

    const feed = await Feed.findById(id);

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

    const newFeed = await Feed.create({
      title,
      text,
      photo: path,
      likes: 0,
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
    const feeds = await Feed.findById(_id);

    if (!feeds) {
      return res.sendStatus(400).send({ message: FAILURE.DeleteFeed });
    }

    await Feed.findByIdAndDelete(_id);
    return res.status(200);
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};
