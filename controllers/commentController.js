const { Comment, User } = require('../models');

const commentController = {
  async getAllComment(req, res) {
    try {
      const dbCommentData = await Comment.find({})
        .populate({
          path: 'user',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 });

      res.json(dbCommentData);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  async getCommentById(req, res) {
    const { id } = req.params;
    try {
      const dbCommentData = await Comment.findOne({ _id: id });
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  async createComment(req, res) {
    const { body } = req;
    try {
      const dbCommentData = await Comment.create(body);
      const dbUserData = await User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { comments: dbCommentData._id } },
        { new: true }
      );
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },

  async updateComment(req, res) {
    const { params, body } = req;
    try {
      const dbCommentData = await Comment.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true }
      );
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async deleteComment(req, res) {
    const { params } = req;
    try {
      const dbCommentData = await Comment.findOneAndDelete({ _id: params.id });
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async addReaction(req, res) {
    const { params, body } = req;
    try {
      const dbCommentData = await Comment.findOneAndUpdate(
        { _id: params.commentId },
        { $addToSet: { reactions: body } },
        { new: true }
      );
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    } catch (err) {
      res.json(err);
    }
  },

  async removeReaction(req, res) {
    const { params } = req;
    try {
      const dbCommentData = await Comment.findOneAndUpdate(
        { _id: params.commentId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );
      res.json(dbCommentData);
    } catch (err) {
      res.json(err);
    }
  }
};

module.exports = commentController;