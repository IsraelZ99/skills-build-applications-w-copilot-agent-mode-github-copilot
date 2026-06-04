import express from 'express';
const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const host = codespaceName ? '0.0.0.0' : 'localhost';
const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.githubpreview.dev`
    : `http://localhost:${port}`;
app.use(express.json());
const users = [
    { id: 'user-1', name: 'Ava', role: 'Runner', joined: '2026-01-12' },
    { id: 'user-2', name: 'Kai', role: 'Cyclist', joined: '2026-02-03' },
];
const teams = [
    { id: 'team-1', name: 'OctoRunners', members: 8 },
    { id: 'team-2', name: 'FitForce', members: 12 },
];
const activities = [
    { id: 'activity-1', user: 'Ava', type: 'Run', duration: 45, calories: 420 },
    { id: 'activity-2', user: 'Kai', type: 'Cycle', duration: 60, calories: 550 },
];
const leaderboard = [
    { rank: 1, user: 'Ava', score: 980 },
    { rank: 2, user: 'Kai', score: 934 },
];
const workouts = [
    { id: 'workout-1', title: 'Morning HIIT', durationMinutes: 30, level: 'Intermediate' },
    { id: 'workout-2', title: 'Recovery Yoga', durationMinutes: 20, level: 'Beginner' },
];
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker backend is running.' });
});
app.get('/api/config', (_req, res) => {
    res.json({ apiUrl, codespaceName: codespaceName || null });
});
app.get('/api/users/', (_req, res) => {
    res.json({ users });
});
app.get('/api/teams/', (_req, res) => {
    res.json({ teams });
});
app.get('/api/activities/', (_req, res) => {
    res.json({ activities });
});
app.get('/api/leaderboard/', (_req, res) => {
    res.json({ leaderboard });
});
app.get('/api/workouts/', (_req, res) => {
    res.json({ workouts });
});
app.listen(port, host, () => {
    console.log(`OctoFit Tracker backend listening on ${host}:${port}`);
    console.log(`API URL: ${apiUrl}`);
});
