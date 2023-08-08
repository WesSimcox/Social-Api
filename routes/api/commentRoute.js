// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../../models/comment');

// Create a new thought (comment)
router.post('/thoughts', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create a new reaction (reply)
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const thought = await Comment.findById(thoughtId);
    if (!thought) {
      return res.status(404).send('Thought not found');
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.status(201).send(thought);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;