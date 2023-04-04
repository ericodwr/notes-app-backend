const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Success adding note',
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'failed adding note',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = (req, h) => {
  return {
    status: 'success',
    data: { notes },
  };
};

const getNoteHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (!note) {
    const response = h.response({
      status: 'fail',
      message: 'note not found',
    });

    response.code(404);
    return response;
  }

  return h.response({
    status: 'success',
    data: { note },
  });
};

const updateNoteHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;

  const updatedAt = new Date().toISOString();

  const updatedNote = { title, tags, body, updatedAt };

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    console.log(notes);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteHandler = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'success delete the note',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'fail delete the note, note not found',
  });

  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
};
