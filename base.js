var _ = require('lodash');

var indent = '  ';
var newline = '\n';

var getArrayArgs = require('./utils').getArrayArgs;

function cssifyDeclaration(declaration, selector){
  return Object.keys(declaration).map(function(property) {
    if (property === 'comment') {
      return indent + '/*'+ declaration[property] + '*/';
    } else {
      return indent + property + ': ' + declaration[property];
    }
  });
}

function cssify(declarations, selector) {
  var res = [];

  if (_.isPlainObject(declarations)) {
    return cssifyDeclaration(declarations, selector);
  }
  declarations.forEach(function(declaration){
    if (Array.isArray(declaration)) {
      res.push(cssify(declaration, selector));
    } else {
      res.push(cssifyDeclaration(declaration, selector));
    }
  });

  return res.join(';' + newline);
}

function stylesheet(args){
  console.log(_.flatten(args).join(''));
}

function rule(selector, declarations) {
  var css = cssify(declarations, selector);
  return (Array.isArray(selector) ? selector.join(','+newline) : selector) + ' {' + newline +
    css + newline +
  '}' + newline;
}

function at(selectors, rules){
  selectorArr = Array.isArray(selectors) ? selectors : [selectors];
  var res = '';
  for (var i = 0; i < rules.length; i++) {
    res = res + rules[i];
  }
  // indent it
  res = res.trim().split(newline).map(function(row){
    return indent + row;
  }).join(newline) + newline;

  return selectorArr.reduce(function(prev,curr){
    return prev + '@' + curr + '{' + newline + res + '}' + newline
  }, '');
}

function keyframes(name, rules) {
  return at(vendorSelector('keyframes ' + name + ' '), rules);
}
function fontFace(rules) {
  return rule('font-face', rules);
}
function media(media, rules) {
  return at('media ' + media, rules);
}

// need separator optn
function declaration(prop, val, unitFn){
  var o = {};
  var args = unitFn(getArrayArgs(arguments, 3)).join(' ');
  o[prop] = (args ? args : val);
  return o;
}

// rename to selector ?
function child(){
  var args = getArrayArgs(arguments);
  return args.join(' ');
}

// function atify(props) {
//   return props.map(function(prop){
//      return '@'+prop;
//   })
// }

module.exports = {
  at:         at, // probably need to make it internal
  rule:       rule,
  stylesheet: stylesheet,
  decl:       declaration,

  fontFace:   fontFace,
  keyframes:  keyframes,
  media:      media,
  _child:     child
};
