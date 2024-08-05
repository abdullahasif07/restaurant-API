import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'practice';

const fetchUser = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Please authenticate using a valid token' });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate using a valid token' });
  }
};

export default fetchUser;
