# Weather App - DataOps

## Description

Leave fur on owners clothes sun bathe, or pounce on unsuspecting person. Just going to dip my paw in your coffee and do a taste test - oh never mind i forgot i don't like coffee - you can have that back now purr like a car engine oh yes, there is my human slave woman she does best pats ever that all i like about her hiss meow catto munch salmono and step on your keyboard while you're gaming and then turn in a circle and claws in the eye of the beholder kitty while happily ignoring when being called. Ask to go outside and ask to come inside and ask to go outside and ask to come inside

## Installation

- Clone this repo
- On your terminal -`cd` to root folder
  -delete data folder to start your own -`npm i` to install dependencies
  - setup `.env` with - `PORT` of your choosing - `CITY` of your choosing - `API_KEY` of your choosing -`node fetchWeather.js` to create/ update data folder -`node app.js` to start server
  - Open browser on `PORT` to see weather and graph

### Using Docker

-Open your docker desktop
-Make sure you are on same path as Dockerfile

- On your terminal run: -`docker build -t <app-name>:<tag> .` or `docker build -t weatherappjs:1.0 .` - to build an image based on Dockerfile -`docker run -p <local-port>:<container-port> <image-name>` or `docker run -p 3000:5000 weatherappjs` - to run a container based on an image

## Tests

we have tests to check if files inside the data folder is correct
