const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const foodRoutes = require('./routes/food');
const authRoutes = require('./routes/auth'); // ✅ AUTH ROUTES

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/wastefreekitchen')
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// ✅ Use Routes
app.use('/api/food', foodRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
