const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const api = require('./routes/api');
const indexRouter = require('./routes/index');

function App(db) {
  const app = express()

  const tempFileDir = path.join(__dirname, 'temp');

  app.use(
    fileUpload({
      createParentPath: true,
      useTempFiles: true,
      tempFileDir,
    })
  );
  
  app.use(
		cors({
			credentials: true,
			origin: function (origin, callback) {
				return callback(null, true);
			},
		})
	);

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/', indexRouter);
  if (db) {
    app.use('/api', api(db));
  }
  return app
}

module.exports = App
