const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('GET Req in notes');
    res.json({message: "Connected to notes!"});
});

module.exports = router;