import {
  SET_SETTING,
  SET_TITLES,
  SET_PRESET,
  ADD_PRESET,
  DELETE_PRESET,
  RESET_PRESET,
 } from '../actions';
import _ from 'lodash';
import uuidV4 from 'uuid/v4';

const DATA = [
  {
    id: uuidV4(),
    name: 'Default',
    data: [
      {
        title: 'Prepare',
        value: 60,
      },
      {
        title: 'Work',
        value: 20,
      },
      {
        title: 'Rest',
        value: 10,
      },
      {
        title: 'Cycles',
        value: 10,
      },
      {
        title: 'Tabatas',
        value: 3,
      },
    ],
  },
];

function setSetting(state, payload) {
  const idx = _.findIndex(state, { name: payload.preset });
  const nestedIdx = _.findIndex(state[idx].data, { title: payload.setting });
  state[idx].data[nestedIdx].value = payload.value;
  return state;
}

function setTitles(state, payload) {
  const idx = _.findIndex(state, { id: payload.id });
  state[idx].userDefinedTitles = payload.titles;
  return state;
}

export default function (state = DATA, action) {
  switch (action.type) {
    case SET_SETTING:
      return setSetting(_.cloneDeep(state), action.payload);
    case SET_TITLES:
      return setTitles(_.cloneDeep(state), action.payload);
    case SET_PRESET:
      return action.payload;
    case ADD_PRESET:
      // Use the default settings as the new preset settings
      return [...state, _.assign({ data: _.cloneDeep(state[0].data) }, { id: uuidV4(), name: action.payload })];
    case DELETE_PRESET:
      return _.filter(state, preset => preset.id !== action.payload);
    case RESET_PRESET:
      return DATA;
    default:
      return state;
  }
}
