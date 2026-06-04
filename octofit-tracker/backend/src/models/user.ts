import mongoose, { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  role: string;
  joined: string;
  teamIds: string[];
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    joined: { type: String, required: true },
    teamIds: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', UserSchema);
