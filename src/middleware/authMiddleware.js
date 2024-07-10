const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

exports.managerMiddleware = (req, res, next) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ error: 'Access forbidden: managers only' });
  }
  next();
};
