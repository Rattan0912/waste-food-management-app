const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const multer = require('multer');
const path = require('path');

// 🧁 Image storage config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// ✅ Add food item (with or without image)
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const foodData = req.body;

    if (req.file) {
      foodData.image = req.file.filename; // Save filename in DB
    }

    const food = new Food(foodData);
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    console.error('Error uploading food:', err);
    res.status(500).json({ error: err.message });
  }
});

// 📥 Add food (JSON-only fallback)
router.post('/', async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    console.error('Error saving food:', err);
    res.status(500).json({ error: err.message });
  }
});

// 📤 Get all food items
router.get('/', async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

// ♻️ Mark item as donated
router.post('/donate/:id', async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, { donated: true }, { new: true });
    res.json(food);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Book food item
router.post('/book/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food || food.booked) {
      return res.status(400).json({ message: 'Item not available' });
    }

    food.booked = true;
    food.bookedBy = req.body.username || 'first-user'; // use real user
    await food.save();
    res.json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete food item
router.delete('/:id', async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔁 Update food item
router.put('/:id', async (req, res) => {
  try {
    const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
