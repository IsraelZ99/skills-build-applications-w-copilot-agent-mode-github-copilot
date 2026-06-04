import { Schema, model } from 'mongoose';
const TeamSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    members: { type: Number, required: true },
    createdAt: { type: String, required: true },
}, { timestamps: true });
export const Team = model('Team', TeamSchema);
