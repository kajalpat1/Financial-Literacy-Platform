const router = require('express').Router();
const handle = require('../handlers');


//console.log('handlers object:', handle);

router.post('/register', handle.register);

router.post('/login', handle.login);

module.exports = router;