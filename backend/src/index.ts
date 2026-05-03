import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ClerkExpressRequireAuth, RequireAuthProp, StrictAuthProp } from '@clerk/clerk-sdk-node';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Public Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Eventlio API' });
});

// Protected Route Example
app.get('/api/protected', ClerkExpressRequireAuth(), (req: RequireAuthProp<Request>, res: Response) => {
  res.json({ 
    message: 'This is a protected route', 
    userId: req.auth.userId 
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
