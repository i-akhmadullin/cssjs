var _ = require('lodash');
var indent = '  ';
var newline = '\n';

function stylesheet(args){
  console.log(_.flatten(args).join(''));
};

function rule(selector, declarations) {
  var css = cssify(declarations, selector);
  return (Array.isArray(selector) ? selector.join(','+newline) : selector) + ' {' + newline +
    css + newline +
  '}' + newline;
}

function at(selectors, rules){
  selectors = Array.isArray(selectors) ? selectors : [selectors];
  var res='';
  for (var i = 0; i < rules.length; i++) {
    res = res + rules[i];
  }
  res = res.split(newline).map(function(row){
    return indent + row;
  }).join(newline);

  return selectors.reduce(function(prev,curr){
    return prev + '@' + curr + '{' + newline + res + newline + '}'+newline
  }, '');
}

function getArrayArgs(args, sliceFrom){
  return Array.prototype.slice.call(args, sliceFrom);
}

function clearfix(selector){
  return rule(selector, [
    { 'zoom': '1' }
  ]) +
  rule([ selector + ':before', selector + ':after' ], [
    { content: '\"\"' },
    { display: 'table' }
  ]) +
  rule(selector + ':after', [
    { clear: 'both' }
  ])
};

function cssifyDeclaration(declaration, selector){
  return Object.keys(declaration).map(function(property) {
    if (property === 'comment') {
      return indent + '/*'+ declaration[property] + '*/';
    } else {
      return indent + property + ': ' + declaration[property];
    }
  });
};

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

function vendorDecl(prop) {
  var args = ''+getArrayArgs(arguments, 1);
  var o = [];
  var prefixes = ['-webkit-', '-moz-', ''];

  prefixes.forEach(function(prefix) {
    var decl = {};
    decl[prefix+prop] = args;
    o.push(decl);
  });

  return o;
}

function vendorProp(prop) {
  var arr = [];
  arr.push('-webkit-'+prop);
  arr.push('-moz-'+prop);
  arr.push(prop);
  return arr;
}

// function atify(props) {
//   return props.map(function(prop){
//      return '@'+prop;
//   })
// }

// function toCamelCase(str) {
//   return str.replace(/-+([^-])/g, function(a, b) {
//     return b.toUpperCase();
//   });
// };

// '50%' -> '50%',  50-> '50px'
function px(units){
  return Array.isArray(units) ? units.map(function(unit){
    return (typeof unit === 'string') ? unit : (unit ? (unit + 'px') : 0);
  }) : (typeof units === 'string') ? units : (units ? (units + 'px') : 0);
}

function url(txt){
  return 'url(\'%1\')'.replace(/%1/, txt);
}

function cubicBezier(txt){
  return 'cubic-bezier(%1)'.replace(/%1/, txt);
}

function color(col){
  return { color: (_.isNumber(col) ? '#'+col : col) };
};


function ie(rules){
  return
};

function borderRadius() {
    var args = ''+getArrayArgs(arguments);
    return vendorDecl('border-radius', args);
}

function boxShadow() {
    var args = ''+getArrayArgs(arguments);
    return vendorDecl('box-shadow', args);
}

function positioning(pos){
  return { position: pos };
}

function decl(prop){
  var o = {};
  var args = '' + px(getArrayArgs(arguments, 1));
  o[prop] = (args ? args : 0);
  return o;
}

function child(){
  var args = getArrayArgs(arguments);
  return args.join(' ');
};

var fixed = positioning.bind(null, 'fixed');
var absolute = positioning.bind(null, 'absolute');
var relative = positioning.bind(null, 'relative');

exports.propList = {

  at:         at,
  rule:       rule,
  stylesheet: stylesheet,

  fixed:    fixed,
  relative: relative,
  absolute: absolute,

  display:                  decl.bind(null, 'display'),

  width:                    decl.bind(null, 'width'),
  height:                   decl.bind(null, 'height'),

  top:                      decl.bind(null, 'top'),
  left:                     decl.bind(null, 'left'),
  right:                    decl.bind(null, 'right'),
  bottom:                   decl.bind(null, 'bottom'),

  animation:                decl.bind(null, 'animation'),

  transition:               decl.bind(null, 'transition'),
  transitionDelay:          decl.bind(null, 'transition-delay'),
  transitionTimingFunction: decl.bind(null, 'transition-timing-function'),

  fontSize:                 decl.bind(null, 'font-size'),
  fontWeight:               decl.bind(null, 'font-weight'),
  lineHeight:               decl.bind(null, 'line-height'),

  zoom:                     decl.bind(null, 'zoom'),
  color:                    color,
  zIndex:                   decl.bind(null, 'zIndex'),
  opacity:                  decl.bind(null, 'opacity'),
  overflow:                 decl.bind(null, 'overflow'),

  background:               decl.bind(null, 'background'),
  backgroundImage:          decl.bind(null, 'background-image'),
  backgroundPosition:       decl.bind(null, 'background-position'),
  backgroundAttachment:     decl.bind(null, 'background-attachment'),

  margin:                   decl.bind(null, 'margin'),
  marginTop:                decl.bind(null, 'margin-top'),
  marginLeft:               decl.bind(null, 'margin-left'),
  marginRight:              decl.bind(null, 'margin-right'),
  marginBottom:             decl.bind(null, 'margin-bottom'),

  border:                   decl.bind(null, 'border'),
  borderTop:                decl.bind(null, 'border-top'),
  borderLeft:               decl.bind(null, 'border-left'),
  borderRight:              decl.bind(null, 'border-right'),
  borderBottom:             decl.bind(null, 'border-bottom'),

  pointerEvents:            decl.bind(null, 'pointer-events'),
  textDecoration:           decl.bind(null, 'text-decoration'),

  _child: child,

  vendorDecl: vendorDecl,
  vendorProp: vendorProp,

  borderRadius: borderRadius,
  boxShadow:    boxShadow,
  
  // convenience fns
  cubicBezier: cubicBezier,
  url: url,

  none: 'none',
  normal: 'normal',

  // units
  px: px,

  clearfix: clearfix,

  decl: decl,
};
