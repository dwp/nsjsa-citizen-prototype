const express = require('express');
const router = express.Router();

const BASE_PATH = 'v2_2-citizen/10-education';
const ABS_BASE_PATH = `/${BASE_PATH}`;
const NEXT_PATH = '/v2_2-citizen/check-answers';

// Redirect /education to first question in sequence
router.get('/', function (req, res) {
  res.redirect(`${ABS_BASE_PATH}/guard`);
});

router.post('/guard', function (req, res) {
  const answer = req.body.eduHaveYou;

  if (typeof answer !== 'undefined') {
    if (answer === 'Yes') {
      res.redirect(`${ABS_BASE_PATH}/course-name`);
    } else {
      res.redirect(NEXT_PATH);
    }
  } else {
    res.redirect(`${ABS_BASE_PATH}/guard`);
  }
});

router.post('/course-name', function (req, res) {
  res.redirect(`${ABS_BASE_PATH}/institution-name`);
});

router.post('/institution-name', function (req, res) {
  res.redirect(`${ABS_BASE_PATH}/course-hours`);
});

router.post('/course-hours', function (req, res) {
  res.redirect(`${ABS_BASE_PATH}/course-duration`);
});

router.post('/course-duration', function (req, res) {
  res.redirect(NEXT_PATH);
});

module.exports = router;
