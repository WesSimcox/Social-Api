const connection = require('../config/connection');
const { User, Comment } = require('../models');
const { getRandomNameCombination, getRandomComments } = require('./data');

const seedDatabase = async () => {
  try {
    await connection;
    console.log('Connected to database');

    // Clear existing data
    await User.deleteMany({});
    await Comment.deleteMany({});

    const generatedComments = [];
    for (let i = 0; i < 10; i++) {
      const commentText = getRandomComments(10);
      const username = getRandomNameCombination();
      generatedComments.push({ commentText, username });
    }

    const users = [
      // Define your user objects here
    ];

    const comments = generatedComments;

    await User.insertMany(users);
    await Comment.insertMany(comments);

    console.log('Data seeding complete');
    console.table(generatedComments);
    console.info('Seed data successful!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();