const express = require('express');
const router = express.Router();

const projectCtrl = require('../controllers/projectControl');

router.get('/load',projectCtrl.saveProjects);
router.get('/all',projectCtrl.getProjects)



module.exports = router;

