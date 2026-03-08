import jsonwebtoken from 'jsonwebtoken';
import Suppiler from '../Models/Supplier.js';

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      req.supplier = await Suppiler.findById(decoded.supplierId).select('-password');
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };