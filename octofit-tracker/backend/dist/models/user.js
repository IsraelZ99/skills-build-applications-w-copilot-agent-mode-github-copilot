import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    joined: { type: String, required: true },
    teamIds: { type: [String], default: [] },
}, { timestamps: true });
export const User = model('User', UserSchema);
