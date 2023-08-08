const { User, Comment } = require('../models');

const userController = {
  async getAllUser(req, res) {
    try {
      const dbUserData = await User.find({})
        .populate({
          path: 'comments',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 });
        
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const dbUserData = await User.findOne({ _id: id })
        .populate({
          path: 'comments',
          select: '-__v'
        })
        .select('-__v');
        
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  async createUser(req, res) {
    const { body } = req;
    try {
      const dbUserData = await User.create(body);
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },

  async updateUser(req, res) {
    const { params, body } = req;
    try {
      const dbUserData = await User.findOneAndUpdate({ _id: params.id }, body, { new: true });
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  async deleteUser(req, res) {
    const { params } = req;
    try {
      const dbUserData = await User.findOneAndDelete({ _id: params.id });
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  async addFriend(req, res) {
    const { params } = req;
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.id },
        { $push: { friends: params.friendId } },
        { new: true }
      )
        .populate({
          path: 'friends',
          select: '-__v'
        })
        .select('-__v');
        
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  async removeFriend(req, res) {
    const { params } = req;
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId } },
        { new: true }
      )
        .populate({
          path: 'friends',
          select: '-__v'
        })
        .select('-__v');
        
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  }
};

module.exports = userController;