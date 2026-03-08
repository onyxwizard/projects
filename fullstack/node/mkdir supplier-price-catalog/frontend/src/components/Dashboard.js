import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Upload from './Upload';
import ProductList from './ProductList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleUploadComplete = () => {
    // Trigger product list refresh
    setRefreshFlag(prev => !prev);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Welcome, {user?.name}</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <Upload onUploadComplete={handleUploadComplete} />
      <ProductList key={refreshFlag} />
    </div>
  );
};

export default Dashboard;