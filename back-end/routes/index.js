const express = require('express');
const account = require('./accounts');
const memo = require('./memo');

const router = express.Router();
router.use('/account', account);
router.use('/memo', memo);

module.exports = router;
