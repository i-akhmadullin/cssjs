var rule = require('./base').rule;
var getArrayArgs = require('./utils').getArrayArgs;

function clearfix(selector){
  return [
    rule(selector, [
      zoom(1)
    ]),
    rule([ selector + before, selector + after ], [
      content('\' \''),
      display('table')
    ]),
    rule(selector + after, [
      clear(both)
    ])
  ]
}

function vendorSelector(selector) {
  var arr = [];
  arr.push('-webkit-' + selector);
  arr.push('-moz-' + selector);
  arr.push(selector);
  return arr;
}

function vendorDecl(prop) {
  var args = getArrayArgs(arguments, 1).join(' ');
  var o = [];
  var prefixes = ['-webkit-', '-moz-', ''];

  prefixes.forEach(function(prefix) {
    var decl = {};
    decl[prefix+prop] = args;
    o.push(decl);
  });

  return o;
}

function borderRadius() {
    var args = ''+px(getArrayArgs(arguments));
    return vendorDecl('border-radius', args);
}

function boxShadow() {
    var args = getArrayArgs(arguments).reduce(function(prev,curr){
      return prev + (Array.isArray(curr) ? curr.join(' ') : ' '+curr);
    });
    return vendorDecl('box-shadow', args);
}

module.exports = {
  vendorSelector: vendorSelector,
  vendorDecl:     vendorDecl, // move to base
  clearfix:       clearfix,
  borderRadius:   borderRadius,
  boxShadow:      boxShadow
};