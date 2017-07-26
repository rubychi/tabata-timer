# Tabata Timer

An online timer for Tabata training (the high-intensity interval training (HIIT) workout)

## [Live Demo](https://tabata-timer.herokuapp.com)

You can see a complete working example [here](https://tabata-timer.herokuapp.com)

## Features

## Getting Started

Follow the instructions below to set up the environment and run this project on your local machine

### Prerequisites

* Node.js
* MongoDB

### Installing

1. Download ZIP or clone this repo
```
> git clone https://github.com/rubychi/tabata-timer.git
```

2. Start a MongoDB server running on port 27017
```
> mongod
```

3. Install dependencies via NPM in both client and server directories
```
> npm install
```

4. Create your own config.json to securely store credentials inside \server\config
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

5. Change to the server directory to start the server
```
> npm run dev-watch
```

6. Change to the client directory to start the service
```
> npm start
```

7. See it up and running on http://localhost:8080

## Deployment

1. Change to the client directory to build a production version of the application
```
> npm run build
```

2. Change to the server directory to deploy to Heroku
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

## Built With

### Frontend:

* react
* redux
* axios

### Backend:

* express
* mongodb
* mongoose
* passport
* jwt-simple

### Utils:

* lodash

## Contributing

Contributions of any kind are welcome

## Author

**Ruby Chi**

## License

This project is licensed under the MIT License

