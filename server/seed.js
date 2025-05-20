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
        question: 'Cats or Dogs?',
        options: [
          { option: 'Cats',  votes: 3 },
          { option: 'Dogs',  votes: 5 }
        ]
      },
      {
        user: user._id,
        question: 'Favourite color?',
        options: [
          { option: 'Blue',  votes: 4 },
          { option: 'Green', votes: 2 },
          { option: 'Red',   votes: 1 }
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
