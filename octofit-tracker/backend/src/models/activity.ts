import mongoose, { Document, Schema, model } from 'mongoose';

export interface IActivity extends Document {
  id: string;
  userId: string;
  userName: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
  distanceKm: number;
}

const ActivitySchema = new Schema<IActivity>(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: String, required: true },
    distanceKm: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Activity = model<IActivity>('Activity', ActivitySchema);
