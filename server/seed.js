require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = require('./models');

const users = [
  { username: 'username', password: 'password' },
  { username: 'kelvin', password: 'password' },
];

const polls = [
  {
    question: 'Which is the best JavaScript framework',
    options: ['Angular', 'React', 'VueJS'],
  },
  { question: 'Who is the best mutant', options: ['Wolverine', 'Deadpool'] },
  { question: 'Truth or dare', options: ['Truth', 'Dare'] },
  { question: 'Boolean?', options: ['True', 'False'] },
];

const runSeed = async () => {
  try {
    await db.User.deleteMany({});
    console.log('🗑️  Dropped all users');

    await db.Poll.deleteMany({});
    console.log('🗑️  Dropped all polls');

    await Promise.all(
      users.map(async (user) => {
        const createdUser = await db.User.create(user);
        console.log('✅ Created user:', createdUser.username);
      })
    );

    await Promise.all(
      polls.map(async (poll) => {
        poll.options = poll.options.map(option => ({ option, votes: 0 }));
        const newPoll = await db.Poll.create(poll);
        const user = await db.User.findOne({ username: 'username' });
        newPoll.user = user._id;
        user.polls.push(newPoll._id);
        await user.save();
        await newPoll.save();
      })
    );

    console.log('🌱 Seeded polls:', polls.length);
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    mongoose.connection.close();
  }
};

runSeed();