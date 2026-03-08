import React, { useState } from 'react';
import axios from '../utils/axios';

const Upload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [summary, setSummary] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setStatus('Uploading...');
    setSummary(null);

    try {
      // Step 1: Upload file
      const uploadRes = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const { jobId } = uploadRes.data;
      setJobId(jobId);
      setStatus('Processing...');

      // Step 2: Poll for job completion
      pollJobStatus(jobId);
    } catch (err) {
      setStatus('Upload failed');
      console.error(err);
      setUploading(false);
    }
  };

  const pollJobStatus = async (id) => {
    const poll = async () => {
      try {
        const res = await axios.get(`/upload/status/${id}`);
        const { state, progress, result } = res.data;
        console.log('Job state:', state, 'progress:', progress);

        if (state === 'completed') {
          setStatus('Completed');
          setSummary(result?.summary);
          setUploading(false);
          onUploadComplete();
          return true;
        } else if (state === 'failed') {
          setStatus('Failed');
          setUploading(false);
          return true;
        } else {
          // still active: update progress if available
          if (progress) setStatus(`Processing... ${progress}%`);
          return false;
        }
      } catch (err) {
        console.error('Polling error:', err);
        setStatus('Error checking status');
        setUploading(false);
        return true;
      }
    };

    // Poll every 2 seconds
    const interval = setInterval(async () => {
      const shouldStop = await poll();
      if (shouldStop) clearInterval(interval);
    }, 2000);
  };

  return (
    <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc' }}>
      <h3>Upload Price List (CSV)</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} required />
        <button type="submit" disabled={uploading}>Upload</button>
      </form>
      {status && <p>Status: {status}</p>}
      {summary && (
        <div>
          <h4>Upload Summary</h4>
          <ul>
            <li>Total Rows: {summary.totalRows}</li>
            <li>New Products: {summary.new}</li>
            <li>Price Changes: {summary.priceChanges}</li>
            <li>Matches: {summary.matches}</li>
            <li>Discontinued: {summary.discontinued}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Upload;