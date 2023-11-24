// IMPORTS
// initializing the express router object
const router = require('express').Router();
// connection to the api routes
const apiRoutes = require('./api');

// mounting the apiRoutes router
router.use('/api', apiRoutes);

// catch-all middleware for any previously defined routes that don't match
router.use((req, res) => {
    return res.send('<h1>❌ Wrong Route! ❌</h1>')
});

// EXPORT
module.exports = router;