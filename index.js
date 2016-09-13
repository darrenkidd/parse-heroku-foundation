"use strict"
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var ghost = require('ghost'); // Ghost blogging platform as needed
require('ghost/core/server/overrides'); // partial fix for ghost
var Analytics = require('analytics-node'); // Analytics setup using Segment.com

var api = new ParseServer({
  databaseURI: process.env.MONGODB_URI,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID,
  appName: process.env.APP_NAME,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL + '/api',  // Don't forget to change to https if needed
  publicServerURL: process.env.SERVER_URL // Required for forgot password emails
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var mountPath = process.env.PARSE_MOUNT; // Serve the Parse API on the /api URL prefix

var app = express();
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use('/public', express.static(path.join(__dirname, '/public'))); // Static files
app.use(bodyParser.json()); // Parsing incoming requests as JSON
app.use(cookieParser()); // Setting and getting cookies
app.disable('quiet'); // Heroku logging
app.use(mountPath, api);

var analytics = new Analytics(process.env.SEGMENT_KEY);

// Set up Ghost blog
ghost({
  config: path.join(__dirname, 'ghost.config.js')
}).then(function (ghostServer) {
    app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start(app);
});

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.render('index');
});

// Rerouting function for templates hosted in public folder
app.get('/templates/:name', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/templates/' + req.params.name));
});

var httpServer = require('http').createServer(app);
ParseServer.createLiveQueryServer(httpServer); // This will enable the Live Query real-time server

/*
* Uncomment the server start function bellow if Ghost isn't running
*/

// httpServer.listen(port, function() {
//     console.log(process.env.APP_NAME + ' running on port ' + process.env.PORT + '.');
// });
