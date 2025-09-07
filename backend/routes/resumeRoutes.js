import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
// import { deleteResume } from "../controllers/resumeController.js";
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from '../controllers/resumeController.js';

const resumeRouter = express.Router();

resumeRouter.post('/', protect, createResume);
resumeRouter.get('/', protect, getResumes);   // ✅ get all resumes
resumeRouter.get('/:id', protect, getResumeById); // ✅ get by id
resumeRouter.put('/:id', protect, updateResume);
resumeRouter.delete('/:id', protect, deleteResume);

export default resumeRouter;
