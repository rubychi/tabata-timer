import { combineReducers } from 'redux';
import presets from './presets';
import activePreset from './activePreset';

const reducers = combineReducers({
  presets,
  activePreset,
});

export default reducers;
