import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/register', (req, res, next) => {
  console.log("🔥 Register route hit");
  next();
}, registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/profile', protect, getUserProfile);

export default userRoutes;
