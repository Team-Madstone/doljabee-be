import mongoose from 'mongoose';
import { TUser } from '../types/user';

const userSchema = new mongoose.Schema<TUser>({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  verifyEmail: { type: Boolean },
});

const User = mongoose.model<TUser>('User', userSchema);
export default User;
