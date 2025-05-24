const db = require('../models');
const { createSearchIndex } = require('../models/user');
const { poll } = require('../routes');
const { options } = require('../routes/auth');

exports.showPolls = async (req, res, next) => {
    try {
        const polls = await db.Poll
                .find()
                .populate('user', 'username _id');

        res.status(200).json(polls);

    } catch (err) {
       err.status = 400;
       next(err);
    }
};

exports.userPolls = async(req, res, next) => {
    try {

        const{ id } = req.decoded;
        const user = await db.User.findById(id)
        .populate('polls');

        res.status(200).json(user.polls);

    } 
    
    catch(err) {
        err.status = 400;
        next(err);
    }
};

exports.createPoll = async (req, res, next) => {
    try {
        console.log(req.decoded);
        const {id} = req.decoded;
        const user = await db.User.findById(id);
        const { question, options } = req.body;
        const poll = await db.Poll.create({
            question,
            user,
            options: options.map(option => ({option, votes: 0}))
            //to add specfic user
        });
        user.polls.push(poll._id);
        await user.save();


        res.status(201).json({...poll._doc, user: user._id });
    } catch(err) {
        err.status = 400;
        next(err);
    }
};

exports.getPoll = async(req, res, next) => {
    try {
        const {id} = req.params;

        const poll = await db.Poll.findById(id).populate('user','username _id');

        if (!poll) throw new Error('No poll Found');

        res.status(200).json(poll);
    }
    catch(err) {
        err.status = 400;
        next(err);
    }
};

exports.deletePoll = async (req, res, next) => {
    try {

      const { id: pollId } = req.params
      const { id: userId } = req.decoded
  
      const poll = await db.Poll.findById(pollId)
      if (!poll) {
        res.status(404)
        throw new Error('No poll found')
      }

      if (poll.user.toString() !== userId) {
        res.status(403)
        throw new Error('Unauthorized access')
      }
      const deleted = await db.Poll.findByIdAndDelete(pollId)
      res.status(202).json(deleted)
    } catch (err) {
      next(err)
    }
  }

  exports.vote = async (req, res, next) => {
    try {
      const { id: pollId } = req.params;
      const { answer } = req.body;
  
      if (!answer) {
        const err = new Error('No answer provided');
        err.status = 400;
        throw err;
      }
  
      const poll = await db.Poll.findById(pollId);
      if (!poll) {
        const err = new Error('No poll found');
        err.status = 404;
        throw err;
      }
  
      poll.options = poll.options.map(opt =>
        opt.option === answer
          ? { ...opt.toObject(), votes: opt.votes + 1 }
          : opt
      );
  
      await poll.save();
  
      res.status(201).json({ poll, selected: answer });
    } catch (err) {

      err.status = err.status || 400;
      next(err);
    }
  };

 