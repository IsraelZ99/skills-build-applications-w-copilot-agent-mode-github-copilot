import mongoose from 'mongoose';

export const port = 8000;
export const codespaceName = process.env.CODESPACE_NAME;
export const host = codespaceName ? '0.0.0.0' : 'localhost';
export const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
export const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.githubpreview.dev`
  : `http://localhost:${port}`;

export async function connectToDatabase() {
  return mongoose.connect(mongoUri);
}

export { mongoose };
