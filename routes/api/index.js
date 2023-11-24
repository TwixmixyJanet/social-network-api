// IMPORTS
// initializing the express router object
const router = require('express').Router();
// connection to the user routes
const userRoutes = require('./userRoutes');
// connection to the thought routes
const thoughtRoutes = require('./thoughtRoutes');

// mounting user and thought routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// EXPORT
module.exports = router;