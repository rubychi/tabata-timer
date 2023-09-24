# Tabata Timer

Online timer for Tabata training (the high-intensity interval training (HIIT) workout)

## [Live Demo](https://tabata-timer.herokuapp.com)

![tabata-timer](https://github.com/rubychi/tabata-timer/assets/18576075/51a85f1c-820d-4fd5-ad48-6c09ffc16fff)

## Features

* Set up your own tabata workout, including

  * Number of exercises in total
  * Number of sets per exercise
  * Preparation time per exercise
  * Work time for each set
  * Rest time for each set

* Name your own set so that you don't need to memorize exercises every time doing your workout routine

* Save your preference as preset to the cloud

* Sign up or sign in through regular process or with Google/Facebook account (OAuth 2.0)

* Responsive web design (RWD)

## Getting Started

Follow the instructions below to set up the environment and run this project on your local machine

### Prerequisites

* Node v15.11.0
* MongoDB

### Installing

1. Download ZIP or clone this repo
```
> git clone https://github.com/rubychi/tabata-timer.git
```

2. Start a MongoDB server running on port 27017

*Start commend depends on the OS, on macOS:*
```
> brew services start mongodb-community
```

3. Install [Lerna](https://github.com/lerna/lerna) and [nodemon](https://github.com/remy/nodemon) globally in your machine
```
> npm install lerna nodemon -g
```

4. Install all the dependencies
```
> lerna bootstrap
```

5. Create your own config.json to securely store credentials inside \packages\server\config
```
{
  "test": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TabataTimerTest",
    "JWT_SECRET": [Your Secret Key],
    "GOOGLE_CLIENT_ID": [Your Google Client ID],
    "GOOGLE_CLIENT_SECRET": [Your Google Client Secret],
    "GOOGLE_CALLBACK_URL": "http://localhost:3000/auth/google/return",
    "FACEBOOK_CLIENT_ID": [Your Facebook Client ID],
    "FACEBOOK_CLIENT_SECRET": [Your Facebook Client Secret],
    "FACEBOOK_CALLBACK_URL": "http://localhost:3000/auth/facebook/return"
  },
  "development": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TabataTimer",
    "JWT_SECRET": [Your Secret Key],
    "GOOGLE_CLIENT_ID": [Your Google Client ID],
    "GOOGLE_CLIENT_SECRET": [Your Google Client Secret],
    "GOOGLE_CALLBACK_URL": "http://localhost:3000/auth/google/return",
    "FACEBOOK_CLIENT_ID": [Your Facebook Client ID],
    "FACEBOOK_CLIENT_SECRET": [Your Facebook Client Secret],
    "FACEBOOK_CALLBACK_URL": "http://localhost:3000/auth/facebook/return"
  }
}

```

6. Replace `authPopup.html` url to http://localhost:8080 to use OAuth 2.0 in the development env
https://github.com/rubychi/tabata-timer/blob/13e8c6937105472c2c0501392c63c5b697d2ec60/packages/server/authPopup.html#L12-L14

7. Back to the root directory and type the below command to start the server and the service
```
> lerna run dev
```

8. See it up and running on http://localhost:8080

## Deployment

1. Build a production version of the application
```
> lerna run build
```

2. Deploy to Heroku
```
> heroku create
> git push heroku master
> heroku addons:create mongolab:sandbox
```

3. Set up config vars
```
> heroku config:set
  MONGODB_URI=[Your MongoDB URI]
  JWT_SECRET=[Your JWT Secret]
  GOOGLE_CLIENT_ID=[Your Google Client ID]
  GOOGLE_CLIENT_SECRET=[Your Google Client Secret]
  GOOGLE_CALLBACK_URL=[Your Google Callback URL]
  FACEBOOK_CLIENT_ID=[Your Facebook Client ID]
  FACEBOOK_CLIENT_SECRET=[Your Facebook Client Secret]
  FACEBOOK_CALLBACK_URL=[Your Facebook Callback URL]
```

4. Open the app in the browser
```
> heroku open
```

## Built With

### Frontend

* babel
* react
* react-sound
* react-bootstrap
* react-css-modules
* redux
* axios
* normalize.css
* postcss
* sass

### Backend

* express
* mongodb
* mongoose
* passport
* jwt-simple
* compression
* helmet

### Utils

* lodash
* webpack

### Style

* Airbnb
