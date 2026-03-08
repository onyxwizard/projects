import express from 'express';
import multer from 'multer';
import { protect } from '../Middleware/auth.js';
import uploadQueue from '../Jobs/uploadQueue.js';

const router = express.Router();

// Configure multer: store file in memory (buffer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  }
});

// POST /api/upload - accept file and queue for processing
router.post('/', protect, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Add job to queue
    const job = await uploadQueue.add({
      supplierId: req.supplier._id,
      fileBuffer: req.file.buffer.toString('base64'), // store as base64 string
      originalName: req.file.originalname
    });

    res.status(202).json({
      message: 'Upload accepted. Processing started.',
      jobId: job.id
    });
  } catch (err) {
    console.error('Error queueing job:', err);
    res.status(500).json({ message: 'Could not queue upload' });
  }
});

// GET /api/upload/status/:jobId - check job status
router.get('/status/:jobId', protect, async (req, res) => {
  try {
    const job = await uploadQueue.getJob(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const state = await job.getState();
    const result = job.returnvalue;
    const progress = job._progress; // or job.progress()

    res.json({
      jobId: job.id,
      state,
      progress,
      result
    });
  } catch (err) {
    console.error('Status error:', err);
    res.status(500).json({ message: 'Error fetching job status' });
  }
});

export default router;