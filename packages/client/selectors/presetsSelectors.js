import {
  createSelector
} from 'reselect';
import _ from 'lodash';

const presetsSelector = state => state.presets;
const activePresetSelector = state => state.activePreset;

export const getActivePreset = createSelector(
  presetsSelector,
  activePresetSelector,
  (presets, activePreset) => {
    return _.find(presets, {
      name: activePreset
    });
  },
);

export const getPresetsName = createSelector(
  presetsSelector,
  (presets) => {
    return presets.map(preset => { return preset.name });
  }
)
