const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const PresetsSchema = new mongoose.Schema({
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  presets: [{
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    data: [{
      title: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        require: true,
      },
    }],
    userDefinedTitles: [String],
  }],
});

PresetsSchema.plugin(findOrCreate);

let Presets = mongoose.model('Presets', PresetsSchema);

module.exports = Presets;
