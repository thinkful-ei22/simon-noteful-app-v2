'use strict';

const knex = require('../knex');

let searchTerm = 'some';

knex
  .select('notes.id', 'title', 'content')
  .from('notes')
  .modify(queryBuilder => {
    if (searchTerm) {
      queryBuilder.where('title', 'like', `%${searchTerm}%`);
    }
  })
  .orderBy('notes.id')
  .then(results => {
    console.log(JSON.stringify(results, null, 2));
  })
  .catch(err => {
    console.error(err);
  });

// search by id

let searchId = '1007';

knex('notes')
  .first('id', 'title', 'content')
  .where('id', `${searchId}`)
  .then(results => {
    console.log(results);
  })
  .catch(err => {
    console.error(err);
  });

// update

let updateObject = {title: 'THIS IS A BIG BOI EDIT', content: 'YOU HEARD ME'};

knex('notes')
  .where('id', `${searchId}`)
  .update(updateObject)
  .then(results => {
    console.log(results);
  })
  .catch(err => {
    console.error(err);
  });

// create

let updateObject = {title: 'someTitle', content: 'someContent'};

knex('notes')
  .insert(updateObject)
  .returning(['id', 'title', 'content'])
  .then(results => {
    console.log(results[0]);
  })
  .catch(err => {
    console.error(err);
  });

//delete

knex('notes')
  .where('id', `${searchId}`) 
  .del()
  .then(results => {
    console.log('Deleted: ', results);
  })
  .catch(err => {
    console.error(err);
  });

