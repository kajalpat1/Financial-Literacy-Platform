const router = require('express').Router();

localStorage.setItem('jwt', token);
api.setToken(token);

const handle = require('../handlers');
const auth = require('../middleware/auth');


router.route('/')
.get(handle.showPolls)
.post(auth, handle.createPoll); //show everything

router.get('/user', auth, handle.userPolls);


router
.route('/:id')
.get(handle.getPoll)
.post(auth, handle.vote)
.delete(auth, handle.deletePoll)


module.exports = router;