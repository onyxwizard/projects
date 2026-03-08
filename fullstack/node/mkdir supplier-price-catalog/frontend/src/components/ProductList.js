import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

const ProductList = ({ refreshFlag }) => {  // receive refreshFlag from Dashboard
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [page, refreshFlag]); // re-fetch when page or refreshFlag changes

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/products?page=${page}&limit=10`);
      console.log('API response:', response.data); // check structure
      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Pagination handlers
  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading && products.length === 0) return <div>Loading products...</div>;

  return (
    <div>
      <h3>Your Products</h3>
      {products.length === 0 ? (
        <p>No products yet. Upload a CSV to get started.</p>
      ) : (
        <>
          <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td>{p.sku}</td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.category || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '10px' }}>
            <button onClick={goToPrevPage} disabled={page <= 1}>Previous</button>
            <span> Page {page} of {totalPages} </span>
            <button onClick={goToNextPage} disabled={page >= totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;