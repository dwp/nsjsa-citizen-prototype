const express = require('express');
const router = express.Router();

const BASE_PATH = 'design-ideas/wt-3070-dfc-content/4-other-benefits';
const ABS_BASE_PATH = `/${BASE_PATH}`;
const NEXT_PATH = '/design-ideas/wt-3070-dfc-content/5-jury-service';

// Redirect /education to first question in sequence
router.get('/', function (req, res) {
  res.redirect(`${ABS_BASE_PATH}/guard`);
});

router.post('/guard', function (req, res) {
  const answer = req.body.obAreYou;

  if (typeof answer !== 'undefined') {
    if (answer === 'Yes') {
      res.redirect(`${ABS_BASE_PATH}/what-other-benefits`);
    } else {
      res.redirect(NEXT_PATH);
    }
  } else {
    res.redirect(`${ABS_BASE_PATH}/guard`);
  }
});

router.post('/what-other-benefits', function (req, res) {
  res.redirect(NEXT_PATH);
});

module.exports = router;
