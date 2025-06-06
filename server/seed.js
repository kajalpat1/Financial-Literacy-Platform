// backend/seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const db = require('./models');   

(async function seed() {
  try {

    await mongoose.connect('mongodb://localhost/vote', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(' MongoDB connected, dropping old users + polls…');


    await db.Poll.deleteMany({});
    await db.User.deleteMany({});

    
    const user = await db.User.create({
      username: 'demo',
      password: 'password'
    });


    const pollData = [
      {
        user: user._id,
        question: 'You receive a $5000 bonus. What do you do?',
        options: [
          {
            option: 'Save in high-yield account',
            votes: 3,
            principal: 5000, 
            rate: 5,          
            amount: null
          },
          {
            option: 'Invest in index fund',
            votes: 5,
            principal: 5000,  
            rate: 8,         
            amount: null
          },
          {
            option: 'Spend on vacation',
            votes: 1,
            principal: 5000,  
            rate: null,
            amount: 1000     
          }
        ]
      },
      {
        user: user._id,
        question: 'You have $1000/month left. Choose a long-term path.',
        options: [
          {
            option: 'Save monthly for 5 years',
            votes: 2,
            principal: 0,     //assume start from $0 and save $1 000/mo
            rate: 5,          
            amount: null
          },
          {
            option: 'Invest monthly for 5 years',
            votes: 3,
            principal: 0,    
            rate: 8,         
            amount: null
          },
          {
            option: 'Pay off student debt',
            votes: 2,
            principal: 10000, 
            rate: null,
            amount: 1000      
          }
        ]
      }
    ];

    await db.Poll.insertMany(pollData);
    console.log('✅ Database seeded successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
})();


