var Todo = require('../models/todo')
var async = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Todos.
exports.todo_list = function (req, res, next) {
  Todo.find()
  .sort([['name', 'ascending']])
  .exec(function (err, list_todos) {
    if (err) { return next(err); }
    // Successful, so render.
    res.render('todo_list', { title: 'Todo List', todo_list: list_todos });
  })
};

// Handle Todo create on POST.
exports.todo_create = [

  // Validate fields.
  body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.'),

  // Sanitize fields.
  sanitizeBody('name').trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render('todo_list', { title: 'Todo List', errors: errors.array() });
      return;
    } else {
      // Create an Todo object with escaped and trimmed data.
      var todo = new Todo(
        {
          name: req.body.name
        });
        todo.save(function (err) {
          if (err) { return next(err); }
          // Successful - redirect to todos.
          res.redirect('/todos');
        });
      }
    }
  ];

  exports.todo_update = [

    // Process request after validation and sanitization.
    (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create Author object with escaped and trimmed data (and the old id!)
      var todo = new Todo(
        {
          done: req.body.done,
          _id: req.body.id
        }
      );

      if (!errors.isEmpty()) {
        res.render('todo_list', { title: 'Todo List', errors: errors.array() });
        return;
      }
      else {
        // Data from form is valid. Update the record.
        Todo.findByIdAndUpdate(req.body.id, todo, {}, function (err, theauthor) {
          if (err) { return next(err); }
          res.send('success');
        });
      }
    }
  ];
