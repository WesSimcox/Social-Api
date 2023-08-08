const router = require('express').Router();
const commentRoutes = require('./commentRoute');
const userRoutes = require('./userRoute');

router.use('/comment', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;