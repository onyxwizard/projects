import Bull from 'bull';

const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = process.env.REDIS_PORT || 6379;

const uploadQueue = new Bull('upload processing', {
  redis: {
    host: '127.0.0.1', // or your Docker IP
    port: 6379,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: 2000,
    removeOnComplete: false,  // Keep completed jobs for status endpoint
    removeOnFail: false,       // Keep failed jobs for debugging
  },
});

// Optional: Log queue events for debugging
uploadQueue.on('error', (error) => {
  console.error('Queue error:', error);
});

uploadQueue.on('failed', (job, error) => {
  console.error(`Job ${job.id} failed:`, error);
});

uploadQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed with result:`, result);
});

export default uploadQueue;