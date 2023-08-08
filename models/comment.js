// models/Comment.js
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  reactionText: { type: String, required: true, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [reactionSchema],
});

commentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.createdAt = ret.createdAt.toISOString(); // Format timestamp
    ret.reactions.forEach(reaction => {
      reaction.createdAt = reaction.createdAt.toISOString(); // Format timestamps in reactions
    });
    return ret;
  },
});

module.exports = mongoose.model('Comment', commentSchema);
