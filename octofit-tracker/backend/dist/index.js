import express from 'express';
const app = express();
const port = 8000;
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker backend is running.' });
});
app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
});
