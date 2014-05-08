var _ = require('lodash');
var declaration = require('./base').decl;
var keywords = require('./keywords');
var units = require('./units');

var px = units.px;
var nounit = units.nounit;
var seconds = units.seconds;

var dimensions = {
  bottom:                    declaration.bind(null, 'bottom', 0, px),
  height:                    declaration.bind(null, 'height', 0, px),
  left:                      declaration.bind(null, 'left',   0, px),
  right:                     declaration.bind(null, 'right',  0, px),
  top:                       declaration.bind(null, 'top',    0, px),
  width:                     declaration.bind(null, 'width',  0, px)
};

var unitless = {
  opacity:                   declaration.bind(null, 'opacity', 0, nounit),
  zIndex:                    declaration.bind(null, 'z-index', 0, nounit),
  zoom:                      declaration.bind(null, 'zoom',    0, nounit)
};

module.exports = {
  animation                   : declaration.bind(null, 'animation',             keywords.none, seconds),

  background                  : declaration.bind(null, 'background',            keywords.none, nounit),
  backgroundAttachment        : declaration.bind(null, 'background-attachment', keywords.normal, nounit),
  backgroundImage             : declaration.bind(null, 'background-image',      keywords.none, nounit),
  backgroundPosition          : declaration.bind(null, 'background-position',   0, px),

  border                      : declaration.bind(null, 'border',        0, px),
  borderBottom                : declaration.bind(null, 'border-bottom', 0, px),
  borderLeft                  : declaration.bind(null, 'border-left',   0, px),
  borderRight                 : declaration.bind(null, 'border-right',  0, px),
  borderTop                   : declaration.bind(null, 'border-top',    0, px),

  clear                       : declaration.bind(null, 'clear',         keywords.none, nounit),
  content                     : declaration.bind(null, 'content',       keywords.none, nounit),

  comment                     : declaration.bind(null, 'comment',       '', nounit),

  display                     : declaration.bind(null, 'display',       keywords.block, nounit),

  font                        : declaration.bind(null, 'font',          'normal normal normal medium/normal Arial, sans-serif', px),
  fontFamily                  : declaration.bind(null, 'font-family',   'Arial, sans-serif', nounit),
  fontSize                    : declaration.bind(null, 'font-size',     0, px),
  fontStyle                   : declaration.bind(null, 'font-style',    keywords.normal, nounit),
  fontWeight                  : declaration.bind(null, 'font-weight',   keywords.normal, nounit),

  lineHeight                  : declaration.bind(null, 'line-height',   0, px),

  margin                      : declaration.bind(null, 'margin',        0, px),
  marginBottom                : declaration.bind(null, 'margin-bottom', 0, px),
  marginLeft                  : declaration.bind(null, 'margin-left',   0, px),
  marginRight                 : declaration.bind(null, 'margin-right',  0, px),
  marginTop                   : declaration.bind(null, 'margin-top',    0, px),

  outline                     : declaration.bind(null, 'outline',       keywords.none, px),
  overflow                    : declaration.bind(null, 'overflow',      keywords.visible, nounit),

  padding                     : declaration.bind(null, 'padding',        0, px),
  paddingBottom               : declaration.bind(null, 'padding-bottom', 0, px),
  paddingLeft                 : declaration.bind(null, 'padding-left',   0, px),
  paddingRight                : declaration.bind(null, 'padding-right',  0, px),
  paddingTop                  : declaration.bind(null, 'padding-top',    0, px),

  pointerEvents               : declaration.bind(null, 'pointer-events',  keywords.auto, nounit),
  src                         : declaration.bind(null, 'src',             keywords.none, nounit),
  textDecoration              : declaration.bind(null, 'text-decoration', keywords.none, nounit),
  transition                  : declaration.bind(null, 'transition',                 0, seconds),
  transitionDelay             : declaration.bind(null, 'transition-delay',           0, seconds, ', '),
  transitionTimingFunction    : declaration.bind(null, 'transition-timing-function', keywords.none, seconds)
};

_.merge(module.exports, dimensions);
_.merge(module.exports, unitless);
