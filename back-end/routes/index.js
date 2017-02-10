const express = require('express');
const account = require('./accounts');
import memo from './memo';

const router = express.Router();
router.use('/account', account);
router.use('/memo', memo);

module.exports = router;
