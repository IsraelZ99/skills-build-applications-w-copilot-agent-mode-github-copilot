import { Schema, model } from 'mongoose';
const WorkoutSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    level: { type: String, required: true },
    focus: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });
export const Workout = model('Workout', WorkoutSchema);
