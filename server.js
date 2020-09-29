'use strict';

const express = require('express');
const wiki = require('wikijs').default;

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(function(req, res, next) {
  // Allows our locally running react client to connect to this locally running api.
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/v1/functions', (req, res) => {
  res.json(
    [
      { label: 'Reduce drag', id: 1 },
      { label: 'Absorb shock', id: 2 },
      { label: 'Dissipate heat', id: 3 },
      { label: 'Increase lift', id: 4 },
      { label: 'Remove particles from a surface', id: 5 }
    ]
  );
});

app.get('/v1/search', (req, res) => {
  // ?q=1 where 1 is a function id.
  // get all wikipedia article ids that have that function id assigned.
  // use wikijs to query the wikipedia api and return article titles and summaries to display on the client.
  wiki().findById(44386495).then(page => res.json([{title: page.raw.title}]));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);