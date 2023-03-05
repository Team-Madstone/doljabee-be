import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  username: { type: String, required: true },
  feed: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Feed',
  },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
