import Feed from '../models/Feed';

export const getFeeds = async (req, res) => {
  const feeds = await Feed.find({});
  try {
    return res.send(feeds);
  } catch (error) {
    return res.status(404);
  }
};

export const getFeed = async (req, res) => {
  const { id } = req.params;
  const feed = await Feed.findById(id);
  return res.send(feed);
};

export const uploadFeed = async (req, res) => {
  const { title, text } = req.body;
  const { path } = req.file;
  const newFeed = await Feed.create({
    title,
    text,
    photo: path,
    likes: 0,
  });

  return res.send(newFeed);
};

export const updateFeed = async (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;
  const { path } = req.file || '';
  const feed = await Feed.findById(id);
  if (!feed) {
    return res.sendStatus(404);
  }

  const updatedFeed = await Feed.findByIdAndUpdate(id, {
    title,
    text,
    photo: path,
  });

  return res.send(updatedFeed);
};

export const deleteFeed = async (req, res) => {
  const { _id } = req.body;
  const feeds = await Feed.findById(_id);
  if (!feeds) {
    return res.sendStatus(404);
  }
  await Feed.findByIdAndDelete(_id);
  return res.sendStatus('200');
};
