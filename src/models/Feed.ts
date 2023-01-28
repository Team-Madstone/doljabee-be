import mongoose from 'mongoose';

const feedSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 30 },
  text: { type: String, required: true, trim: true, minLength: 3 },
  photo: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  likes: { type: Number },
});

const Feed = mongoose.model('Feed', feedSchema);
export default Feed;
