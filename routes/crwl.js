var express = require('express');
var router = express.Router();

router.get('/crwl_api', function(req, res, next) {
  res.send('test');
});

module.exports = router;
