const names = ['Alice', 'Bob', 'Charlie', 'David', 'Ella', 'Frank', 'Grace', 'Henry', 'Isabel', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Ryan', 'Sophia', 'Thomas'];
const commentDetails = [
  'I love hiking in the mountains',
  'What\'s your favorite book?',
  'Anyone up for a game of soccer?',
  'Looking for recommendations for a new movie to watch',
  'Just finished a great workout!',
  'Has anyone tried the new restaurant downtown?',
  'Excited for the upcoming music festival',
  'Need advice on choosing a laptop',
  'Planning a road trip with friends, any suggestions?',
  'Enjoying a relaxing day at the beach'
];

// Function to get a random element from an array
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Function to generate a random comment
const getRandomComments = (count) => {
  const randomComments = [];
  for (let i = 0; i < count; i++) {
    randomComments.push(getRandomElement(commentDetails));
  }
  return randomComments;
};

// Function to generate a random name combination
const getRandomNameCombination = () => `${getRandomElement(names)} ${getRandomElement(names)}`;

module.exports = { getRandomNameCombination, getRandomComments };