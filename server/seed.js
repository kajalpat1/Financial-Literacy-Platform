require('dotenv').config();
const mongoose = require('mongoose');
const db = require('./models');

(async () => {
  await mongoose.connect('mongodb://localhost/vote');
  await db.User.deleteMany({});
  await db.Poll.deleteMany({});

  const user = await db.User.create({ username: 'demo', password: 'demo' });
  const poll = await db.Poll.create({
    user,
    question: 'Best JS framework?',
    options: [
      { option: 'React', votes: 5 },
      { option: 'Vue',   votes: 3 },
      { option: 'Svelte', votes: 2 }
    ]
  });
  user.polls.push(poll._id);
  await user.save();
  console.log('Seed complete');
  process.exit();
})();
