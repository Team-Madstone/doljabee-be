import Feed from '../models/Feed';

export const getFeeds = async (req, res) => {
  const feeds = await Feed.find({});
  try {
    return res.send(feeds);
  } catch (error) {
    return res.sendStatus(404);
  }
};

export const getFeed = async (req, res) => {
  const { id } = req.params;
  const feed = await Feed.findById(id);
  try {
    return res.send(feed);
  } catch (error) {
    return res.sendStatus(404);
  }
};

export const uploadFeed = async (req, res) => {
  const { title, text } = req.body;
  const { path } = req.file;
  try {
    const newFeed = await Feed.create({
      title,
      text,
      photo: path,
      likes: 0,
    });
    return res.send(newFeed);
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const updateFeed = async (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;
  const file = req.file;
  const path = file && file.path;

  const feed = await Feed.findById(id);
  if (!feed) {
    return res.sendStatus(404);
  }

  try {
    const updatedFeed = await Feed.findByIdAndUpdate(id, {
      title,
      text,
      photo: path,
    });
    return res.send(updatedFeed);
  } catch (error) {
    return res.sendStatus(404);
  }
};

export const deleteFeed = async (req, res) => {
  const { _id } = req.body;
  const feeds = await Feed.findById(_id);
  if (!feeds) {
    return res.sendStatus(404);
  }

  try {
    await Feed.findByIdAndDelete(_id);
    return res.sendStatus('200');
  } catch (error) {
    return res.sendStatus(404);
  }
};
