const express = require('express');
const router = express.Router();
const { createUser, getUser, updateUser, deleteUser,getUserById } = require('../Controller/userController.js');
const User = require('../model/User');

router.post('/',createUser);
router.get('/',getUser);
router.get('/:id',getUserById);
router.put('/:id',updateUser);
router.delete('/:id' , deleteUser);
 
module.exports = router;