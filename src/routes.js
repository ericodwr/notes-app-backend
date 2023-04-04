const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return 'Home Page';
    },
  },
  {
    method: '*',
    path: '/',
    handler: (req, h) => {
      return 'Page not found on this route';
    },
  },
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateNoteHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteHandler,
  },
];

module.exports = routes;
