import mongoose, { Document, Schema, model } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  rank: number;
  userId: string;
  userName: string;
  score: number;
  totalActivities: number;
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    rank: { type: Number, required: true, unique: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    totalActivities: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema);
