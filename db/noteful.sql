-- folders

-- DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    name text NOT NULL
);

ALTER SEQUENCE folders_id_seq RESTART WITH 100;

INSERT INTO folders (name) VALUES
  ('Archive'),
  ('Drafts'),
  ('Personal'),
  ('Work');

-- notes

-- DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT now(),
  folder_id int REFERENCES folders(id) ON DELETE SET NULL
);

ALTER SEQUENCE notes_id_seq RESTART WITH 1000;

INSERT INTO notes (title, content, folder_id) VALUES
  (
    '1 life lessons learned from cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    100
  ),
  (
    '2 life lessons learned from cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    100
  ),
  (
    '3 life lessons learned from cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    101
  ),
  (
    '4 life lessons learned from cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    102
  ),
  (
    '5 life lessons learned from cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    102
  );

-- tags

-- DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
  id serial PRIMARY KEY,
  name text NOT NULL
);

INSERT INTO tags (name) VALUES
  ('Tag 1'),
  ('Tag 2'),
  ('Tag 3');

-- notes_tags

-- DROP TABLE IF EXISTS notes_tags;

CREATE TABLE notes_tags (
  note_id INTEGER NOT NULL REFERENCES notes ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags ON DELETE CASCADE
);

INSERT INTO notes_tags (note_id, tag_id) VALUES
  (1000, 1),
  (1000, 2),
  (1000, 3),
  (1001, 3),
  (1001, 1),
  (1002, 2),
  (1003, 1),
  (1004, 1);