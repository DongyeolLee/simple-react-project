'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var express = require('express');
var Memo = require('../models/memo');
var mongoose = require('mongoose');

var router = express.Router();

// WRITE MEMO
router.post('/', function (req, res) {
    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if (typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CREATE NEW MEMO
    var memo = new Memo({
        writer: req.session.loginInfo.username,
        contents: req.body.contents
    });

    // SAVE IN DATABASE
    memo.save(function (err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});

// MODIFY MEMO
router.put('/:id', function (req, res) {

    // CHECK MEMO ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if (typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        });
    }

    // FIND MEMO
    Memo.findById(req.params.id, function (err, memo) {
        if (err) throw err;

        // IF MEMO DOES NOT EXIST
        if (!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        // IF EXISTS, CHECK WRITER
        if (memo.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
            });
        }

        // MODIFY AND SAVE IN DATABASE
        memo.contents = req.body.contents;
        memo.date.edited = new Date();
        memo.is_edited = true;

        memo.save(function (err, memo) {
            if (err) throw err;
            return res.json({
                success: true,
                memo: memo
            });
        });
    });
});

// DELETE MEMO
router.delete('/:id', function (req, res) {

    // CHECK MEMO ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND MEMO AND CHECK FOR WRITER
    Memo.findById(req.params.id, function (err, memo) {
        if (err) throw err;

        if (!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }
        if (memo.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 4
            });
        }

        // REMOVE THE MEMO
        Memo.remove({ _id: req.params.id }, function (err) {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

// GET MEMO LIST
router.get('/', function (req, res) {
    Memo.find().sort({ "_id": -1 }).limit(6).exec(function (err, memos) {
        if (err) throw err;
        res.json(memos);
    });
});

exports.default = router;
//# sourceMappingURL=memo.js.map