import { Schema, model } from 'mongoose';
const LeaderboardSchema = new Schema({
    rank: { type: Number, required: true, unique: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    totalActivities: { type: Number, required: true },
}, { timestamps: true });
export const Leaderboard = model('Leaderboard', LeaderboardSchema);
