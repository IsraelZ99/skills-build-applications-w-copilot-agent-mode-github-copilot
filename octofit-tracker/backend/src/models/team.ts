import mongoose, { Document, Schema, model } from 'mongoose';

export interface ITeam extends Document {
  id: string;
  name: string;
  members: number;
  createdAt: string;
}

const TeamSchema = new Schema<ITeam>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    members: { type: Number, required: true },
    createdAt: { type: String, required: true },
  },
  { timestamps: true },
);

export const Team = model<ITeam>('Team', TeamSchema);
