# Parse Heroku and Foundation

Using the [parse-server](https://github.com/ParsePlatform/parse-server) module on Express.

Read the full Parse Server guide here: https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide

Thanks to [CreatityKills/foundations-apps-template](https://github.com/CreativityKills/foundation-apps-template) for the modified [Foundation for Apps](https://github.com/zurb/foundation-apps-template) build system.

Read the Foundation for Apps docs here: http://foundation.zurb.com/apps/docs/

## Analytics

Using the Segment Angular analytics module here: https://github.com/aleross/angular-segment-analytics

Using the Segment node module as per docs here:
https://segment.com/docs/libraries/node

## Requirements

You'll need the following software installed to get started.

  - [Node.js](http://nodejs.org): Use the installer for your OS.
  - [Git](http://git-scm.com/downloads): Use the installer for your OS.
    - Windows users can also try [Git for Windows](http://git-for-windows.github.io/).
  - [Gulp](http://gulpjs.com/) and [Bower](http://bower.io): Run `npm install -g gulp bower`
    - Depending on how Node is configured on your machine, you may need to run `sudo npm install -g gulp bower` instead, if you get an error with the first command.


### For Local Development

* Make sure you have at least Node 4.3. `node --version`
* Clone this repo and change directory to it.
* `npm install && bower install`
* Install mongo locally using http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/
* Run `mongo` to connect to your database, just to make sure it's working. Once you see a mongo prompt, exit with Control-D
* Run the server with: `npm run local` (`npm start` will run the Parse server but not build the Foundation app or watch for file changes)
* By default it will use a path of /parse for the API routes.  To change this, or use older client SDKs, run `export PARSE_MOUNT=/1` before launching the server.
* You now have a database named "dev" that contains your Parse data
* Install ngrok and you can test with devices

### Getting Started With Heroku + Mongolab Development
* Log in with the [Heroku Toolbelt](https://toolbelt.heroku.com/) and create an app: `heroku create`
* Use the [MongoLab addon](https://elements.heroku.com/addons/mongolab): `heroku addons:create mongolab:sandbox --app YourAppName`
* By default it will use a path of /parse for the API routes.  To change this, or use older client SDKs, run `heroku config:set PARSE_MOUNT=/1`
* Deploy it with: `git push heroku master`
You can choose to connect your Heroku account to Github for when you pull changes into your production branch. Or you can push directly from the command line to Heroku as needed.

# Using it

Before using it, you can access a test page to verify if the basic setup is working fine [http://localhost:1337/test](http://localhost:1337).

When you are running `npm run local`, this will first compile the Sass and assemble your Angular app on the Parse Server. When you change any file in the `client` folder, the appropriate Gulp task will run to build new files.

Then you can use the Parse REST API, the JavaScript SDK, and any of our open-source SDKs:

Example requests to a server running locally:

```curl
curl -X POST \
  -H "X-Parse-Application-Id: myAppId" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
  http://localhost:1337/parse/classes/GameScore

  curl -X GET \
    -H "X-Parse-Application-Id: myAppId" \
    http://localhost:1337/parse/classes/GameScore

  curl -X DELETE \
    -H "X-Parse-Application-Id: myAppId" \
    http://localhost:1337/parse/classes/GameScore/SSbUu5c7U0  

curl -X POST \
  -H "X-Parse-Application-Id: myAppId" \
  -H "Content-Type: application/json" \
  -d '{}' \
  http://localhost:1337/parse/functions/hello
```
