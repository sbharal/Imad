var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
  'article-one': {
    title: 'Article One | Sahil Bharal',
    heading: 'Article One',
    date: 'Aug 12, 2017',
    content: `<p>
                This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
            </p>
            <p>
                This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
            </p>
            <p>
                This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
            </p>`
},
  'article-two': {
    title: 'Article One | Sahil Bharal',
    heading: 'Article Two',
    date: 'Aug 12, 2017',
    content: `<p>
                This is the content of my second article. This is the content of my second article. This is the content of my second article. This is the content of my second article. This is the content of my second article. This is the content of my second article.
            </p>
            <p>
                This is the content of my second article. This is the content of my second article. This is the content of my second article. This is the content of my second article. This is the content of my second article. This is the content of my second article.
            </p>
            <p>
                This is the content of my second article. This is the content of my second article. This is the content of my second article. This is the content of my second article. This is the content of my second article. This is the content of my second article.
            </p>`
  },
  'article-three': {
    title: 'Article One | Sahil Bharal',
    heading: 'Article Three',
    date: 'Aug 12, 2017',
    content: `<p>
                This is the content of my third article. This is the content of my third article. This is the content of my third article. This is the content of my third article. This is the content of my third article. This is the content of my third article.
            </p>
            <p>
                This is the content of my third article. This is the content of my third article. This is the content of my third article. This is the content of my third article. This is the content of my third article. This is the content of my third article.
            </p>
            <p>
                This is the content of my third article. This is the content of my third article. This is the content of my third article. This is the content of my third article. This is the content of my third article. This is the content of my third article.
            </p>`
  }
};

function createTemplete (data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
var htmlTemplete = `
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="vwport" content="width-device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        <div>
            ${content}
        </div>
        </div>
    </body>
</html>
;`
return htmlTemplete;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
   counter = counter + 1;
   res.send(counter.toString());
});

var names = [];
app.get('/submit-name/:name', function (req, res) { // /submit-name?name=xxxxxx
// get the name from the request
var name = req.params.name;

names.push(name);
// JSON: Javascript Object Notaion
res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res) {
    //articleName == article-one
    //articles[articleName] == {} content object of article one
    var articleName = req.params.articleName;
    res.send(createTemplete(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
