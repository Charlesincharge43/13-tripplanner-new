const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const router = require('./routes');

const db = require('./db').db;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use(express.static('public'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/', router);

// root path
app.get('/', function(req, res, next) {
  res.render('index', {message: 'hello'});
});

// error handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
    .render('error', {message: 'oh no :-('});
});

//{force: true}
db.sync()
  .then(() => {
    console.log(chalk.cyan('DB SYNCED!'));
    app.listen(1337, () => {
      console.log(chalk.green('Planning on port 1337'));
    });
  })
  .catch(err => {
    console.log(chalk.red('DB SYNC WENT WRONG...'));
  });
