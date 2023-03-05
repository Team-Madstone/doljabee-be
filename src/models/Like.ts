import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  feed: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Feed',
  },
});

const Like = mongoose.model('Like', likeSchema);
export default Like;
