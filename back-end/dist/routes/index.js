'use strict';

var _memo = require('./memo');

var _memo2 = _interopRequireDefault(_memo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var account = require('./accounts');


var router = express.Router();
router.use('/account', account);
router.use('/memo', _memo2.default);

module.exports = router;
//# sourceMappingURL=index.js.map