let ROOT_URL = 'https://tabata-timer.herokuapp.com';
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  ROOT_URL = 'http://localhost:3000';
}

const SET_SETTING = 'SET_SETTING';
const SET_TITLES = 'SET_TITLES';
const SET_PRESET = 'SET_PRESET';
const ADD_PRESET = 'ADD_PRESET';
const DELETE_PRESET = 'DELETE_PRESET';
const RESET_PRESET = 'RESET_PRESET';
const CHANGE_ACTIVE_PRESET = 'CHANGE_ACTIVE_PRESET';

module.exports = {
  ROOT_URL,
  SET_SETTING,
  SET_TITLES,
  SET_PRESET,
  ADD_PRESET,
  DELETE_PRESET,
  RESET_PRESET,
  CHANGE_ACTIVE_PRESET,
};
