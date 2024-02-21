const fs = require('fs');

// Function to generate a random alphanumeric string
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to generate a random email address
function generateRandomEmail() {
  const domains = ['example.com', 'test.com', 'domain.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `user${Math.floor(Math.random() * 100)}@${randomDomain}`;
}

// Generate 10 users
const users = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  username: `user${index + 1}`,
  email: generateRandomEmail(),
  password: generateRandomString(8), // You should use a secure method for generating passwords
}));

// Convert users array to JSON format
const usersJSON = JSON.stringify(users, null, 2);

// Write JSON data to users.json file
fs.writeFileSync('users.json', usersJSON);

console.log('users.json file generated successfully.');

