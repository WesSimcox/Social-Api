// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../../models/user');

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add a friend to a user
router.post('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.friends.push(friendId);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;