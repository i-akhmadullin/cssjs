var getArrayArgs = require('./utils').getArrayArgs;
var _ = require('lodash');
var _color = require('color');

exports.url = function url(txt){
  var args = getArrayArgs(arguments, 1).join('');
  return 'url(\'%1\')'.replace(/%1/, txt + args);
};
exports.translate3d = function translate3d(val){
  return 'translate3d(%1)'.replace(/%1/, px(val));
};
exports.translateX = function translateX(val){
  return 'translateX(%1)'.replace(/%1/, px(val));
};
exports.translateY = function translateY(val){
  return 'translateY(%1)'.replace(/%1/, px(val));
};
exports.translateZ = function translateZ(val){
  return 'translateZ(%1)'.replace(/%1/, px(val));
};
exports.cubicBezier = function cubicBezier(){
  var args = getArrayArgs(arguments).join(', ');
  return 'cubic-bezier(%1)'.replace(/%1/, args);
};

exports.color = function color(col){
  // color(999) -> #999
  if (_.isNumber(col)){ col = '#' + col; }
  var color = _color(col);
  return { color: color.keyword() ? color.keyword() : color.hexString() };
};

exports.rgb = function rgb(){
  var args = ''+getArrayArgs(arguments).join('');
  return _color().rgb(args).rgbString();
};
exports.rgba = function rgba(){
  var args = ''+getArrayArgs(arguments).join('');
  return _color(args).hexString();
};
exports.hsl = function hsl(col){
  var a = ''+getArrayArgs(arguments);
  console.log('a', a, typeof a);
  return _color().hsl(a).hexString();
};
