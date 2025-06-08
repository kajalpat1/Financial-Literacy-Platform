//backend/models/poll.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const OptionSchema = new Schema(
  {
    option: {
      type: String,
      required: true
    },
    votes: {
      type: Number,
      default: 0
    },
    principal: {
      type: Number,
      default: 0
    },
    rate: {
      type: Number,
      default: null
    },
    amount: {
      type: Number,
      default: null
    }
  },
  { _id: false } 
);


const PollSchema = new Schema(
  {
    question: {
      type: String,
      required: true
    },
    options: {
      type: [OptionSchema],
      validate: [optArr => optArr.length === 3, 'Must supply exactly 3 options.']

    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    voted: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Poll', PollSchema);
