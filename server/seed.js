require('dotenv').config();         
const mongoose = require('mongoose');
const db = require('./models');

(async function seed() {
  try {
    await mongoose.connect('mongodb://localhost/vote');
    console.log('Mongo connected, dropping old polls …');
    await db.Poll.deleteMany({});   
    await db.User.deleteMany({});   

    
    const user = await db.User.create({
      username: 'demo',
      password: 'password'          //
    });

   
    const pollData = [
      {
        user: user._id,
        question: 'You receive a $5000 bonus. What do you do?',
        options: [
          { option: 'Save in high-yield account',  votes: 3 },
          { option: 'Invest in index fund',        votes: 5 },
          { option: 'Spend on vacation',           votes: 1 }
        ]
      },
      {
        user: user._id,
        question: 'You have $1000/month left. Choose a long-term path.',
        options: [
          { option: 'Save monthly for 5 years',    votes: 2 },
          { option: 'Invest monthly for 5 years',  votes: 3 },
          { option: 'Pay off student debt',        votes: 2 }
        ]
      }
    ];

    await db.Poll.insertMany(pollData);
    console.log('  Database seeded!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
})();
