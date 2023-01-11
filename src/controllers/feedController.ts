import Feed from '../models/Feed';

let feeds = [
  {
    id: 1,
    title: 'first',
    text: 'hello! how are you?',
    createdAt: 'just now',
    likes: 0,
  },
  {
    id: 2,
    title: 'second',
    text: 'This is me!',
    createdAt: 'just now',
    likes: 0,
  },
];

export const getFeeds = async (req, res) => {
  return res.send(feeds);
};

export const getFeed = async (req, res) => {
  const { id } = req.params;
  const feed = feeds.find((f) => f.id === Number(id));
  return res.send(feed);
};

export const uploadFeed = async (req, res) => {
  const newFeed = {
    id: feeds[feeds.length - 1].id + 1,
    title: 'second',
    text: 'This is me!',
    createdAt: 'just now',
    likes: 0,
  };
  feeds.push(newFeed);

  return res.send(feeds);
};
export const updateFeed = async (req, res) => {
  const { id } = req.params;
  feeds = feeds.map((f) => {
    if (f.id === Number(id)) {
      f.title = 'updated';
    }
    return f;
  });

  return res.send(feeds);
};
export const deleteFeed = async (req, res) => {
  const { id } = req.params;
  feeds = feeds.filter((f) => f.id !== Number(id));
  return res.send(feeds);
};
