const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const { authMiddleware, managerMiddleware } = require('./middleware/authMiddleware');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/departments', authMiddleware, managerMiddleware, departmentRoutes);
app.use('/api/employees', authMiddleware, employeeRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Connection error', error.message);
  });
