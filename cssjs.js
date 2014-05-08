var _ = require('lodash');
// var _color = require('color');

var properties = {
  // _color: _color
};

exports.properties = properties;

_.merge(properties, require('./base'));
_.merge(properties, require('./keywords'));
_.merge(properties, require('./aliases'));
_.merge(properties, require('./colors'));
_.merge(properties, require('./declarations'));
_.merge(properties, require('./formats'));
_.merge(properties, require('./functions'));
_.merge(properties, require('./mixins'));
_.merge(properties, require('./pseudos'));
_.merge(properties, require('./units'));



exports.inject = function inject(){
  _.merge(global, properties);
};

exports.render = function render(str){
  return eval.call(properties, 'stylesheet("asdsaf")');
  // return eval.call(properties, str);
};

