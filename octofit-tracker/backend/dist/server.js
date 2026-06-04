import { app } from './index.js';
import { connectToDatabase, host, port, apiUrl, codespaceName } from './config/database.js';
connectToDatabase()
    .then(() => {
    app.listen(port, host, () => {
        console.log(`OctoFit Tracker backend listening on ${host}:${port}`);
        console.log(`API URL: ${apiUrl}`);
        console.log(`CODESPACE_NAME: ${codespaceName || 'not set'}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
