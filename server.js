'use strict';

const { urlencoded } = require('express');
const express = require('express');
const wiki = require('wikijs').default;
const { Client } = require('pg')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const clientConn = {
  user: 'postgres',
  host: 'localhost',
  database: 'petal',
  password: 'mysecretpassword',
  port: 5432,
}

// App
const app = express();

app.use(function(req, res, next) {
  // Allows our locally running react client to connect to this locally running api.
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/v1/functions', (req, res) => {
  var client = new Client(clientConn);
  client.connect()
  client.query('SELECT * FROM functions', (err, result) => {
    client.end()
    if(err) {
      console.log(err.stack);
      res.json({error: true});
    }
    else {
      res.json(result.rows);
    }
  })
});

app.get('/v1/search', (req, res) => {
  // ?q=1 where 1 is a function id.
  // get all wikipedia article ids that have that function id assigned.
  // use wikijs to query the wikipedia api and return article titles and summaries to display on the client.

  // Fixes an error: https://github.com/dijs/wiki/issues/136
  var headers = { headers: { 'User-Agent': 'server.js (https://github.com/nasa/petal-api; bruffridge@nasa.gov) wiki.js' } }
  var tempPages, tempImages;
  var articles = [];

  wiki(headers).pagesInCategory('Category:American_sparrows')
  .then(pageTitles =>
    getPages(pageTitles)
  )
  .then(pages => {
    tempPages = pages;
    return getImages(pages);
  })
  .then(images => {
    tempImages = images;
    return getSummaries(tempPages);
  })
  .then(summaries => {
    var i = 0;
    for (var page of tempPages) {
      var article = {
        id: page.raw.pageid,
        url: page.raw.fullurl,
        title: page.raw.title,
        image: tempImages[i],
        summary: summaries[i]
      }
      articles.push(article);
      i++;
    }
    res.json(articles);
  })
  .catch(error => console.log(error));

  function getPages(pageTitles) {
    var promises = [];
    //var articles = [];
    for (var pageTitle of pageTitles) {
      promises.push(wiki(headers).page(pageTitle));
    }
    return Promise.all(promises);
  }

  function getSummaries(pages) {
    var promises = [];
    for (var page of pages) {
      promises.push(page.summary());
    }
    return Promise.all(promises);
  }

  function getImages(pages) {
    var promises = [];
    for (var page of pages) {
      promises.push(page.mainImage());
    }
    return Promise.all(promises);
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);