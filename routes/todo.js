var express = require('express');
var router = express.Router();
var todo_controller = require('../controllers/todoController');

router.get('/', todo_controller.todo_list);
router.post('/', todo_controller.todo_create);
router.patch('/', todo_controller.todo_update);

module.exports = router;
