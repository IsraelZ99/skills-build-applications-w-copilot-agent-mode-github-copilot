import mongoose, { Document, Schema, model } from 'mongoose';

export interface IWorkout extends Document {
  id: string;
  title: string;
  durationMinutes: number;
  level: string;
  focus: string;
  description: string;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    level: { type: String, required: true },
    focus: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = model<IWorkout>('Workout', WorkoutSchema);
