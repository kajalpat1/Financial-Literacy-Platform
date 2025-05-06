const router = require('express').Router();


const handle = require('../handlers');
const auth = require('../middleware/auth');


router.route('/')
.get(handle.showPolls)
.post(auth, handle.createPoll); //show everything

module.exports = router;