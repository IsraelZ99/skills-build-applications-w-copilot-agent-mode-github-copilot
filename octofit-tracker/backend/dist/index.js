import express from 'express';
import mongoose from 'mongoose';
import { User } from './models/user.js';
import { Team } from './models/team.js';
import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Workout } from './models/workout.js';
import { apiUrl, codespaceName, host, mongoUri, port } from './config/database.js';
const app = express();
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker backend is running.' });
});
app.get('/api/config', (_req, res) => {
    res.json({ apiUrl, codespaceName: codespaceName || null, mongoUri });
});
app.get('/api/users/', async (_req, res) => {
    const users = await User.find().sort({ joined: -1 });
    res.json({ users });
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await Team.find().sort({ name: 1 });
    res.json({ teams });
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await Activity.find().sort({ date: -1 });
    res.json({ activities });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 });
    res.json({ leaderboard });
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await Workout.find().sort({ durationMinutes: 1 });
    res.json({ workouts });
});
mongoose
    .connect(mongoUri)
    .then(() => {
    app.listen(port, host, () => {
        console.log(`OctoFit Tracker backend listening on ${host}:${port}`);
        console.log(`API URL: ${apiUrl}`);
        console.log(`Connected to MongoDB at ${mongoUri}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
