'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  knex('folders')
    .first('id', 'name')
    .where('id', `${id}`)
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const updateObj = {};
  const updateableFields = ['name'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  if (!updateObj.title) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  knex('folders')
    .where('id', `${id}`)
    .update(`${updateObj.name}`)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const {name} = req.body;
  const newFolder = {name};
  if (!newFolder.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  knex('folders')
    .insert(newFolder)
    .returning('id', 'name')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  knex('folders')
    .where('id', `${id}`)
    .del()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;