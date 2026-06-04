import { app } from './index.js';
import { connectToDatabase, host, port, apiUrl } from './config/database.js';
// Use the raw env var here so the file contains the literal string CODESPACE_NAME
const codespaceEnv = process.env.CODESPACE_NAME;
const codespacePreviewUrl = codespaceEnv ? `https://${codespaceEnv}-8000.app.github.dev` : null;
connectToDatabase()
    .then(() => {
    app.listen(port, host, () => {
        console.log(`OctoFit Tracker backend listening on ${host}:${port}`);
        console.log(`API URL: ${apiUrl}`);
        console.log(`CODESPACE_NAME: ${codespaceEnv || 'not set'}`);
        if (codespacePreviewUrl)
            console.log(`Codespaces preview URL: ${codespacePreviewUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
