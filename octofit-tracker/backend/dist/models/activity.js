import { Schema, model } from 'mongoose';
const ActivitySchema = new Schema({
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: String, required: true },
    distanceKm: { type: Number, required: true },
}, { timestamps: true });
export const Activity = model('Activity', ActivitySchema);
