var fcss = require('./fcss');
var bemHelpers = require('./fcss-bem').bemHelpers;

// globally load all the shit, yolo!
var propList = fcss.propList;
Object.keys(propList).forEach(function(prop){
  this[prop] = propList[prop];
});
Object.keys(bemHelpers).forEach(function(helperName){
  this[helperName] = bemHelpers[helperName];
});

var path = require('path');
var block = '.' + __filename.slice(__filename.lastIndexOf(path.sep)+1, __filename.length-7); // .css, right?

var elem = _elem.bind(null, block);
var mod = _mod.bind(null, block);
var elemMod = _elemMod.bind(null, block);

// custom aliases
var z = zIndex;
var bg = background;

var child = _child;

// just variable
var animationName = 'themeSelectFadeIn';

stylesheet([

  rule(block, [
    absolute(),
    top(285),
    left('50%'),
    overflow('hidden'),
    width(652),
    height(157),
    marginLeft(-326),
    transition('0.5s 0.5s left, 0.5s 0.5s width, 0.5s 0.5s height, 0.5s box-shadow, 0.5s 0.5s margin-left'),
    vendorDecl('animation', animationName + ' 0.4s 3.4s forwards'),
    opacity()
  ]),

  at(vendorProp('keyframes ' + animationName),
    rule('to', opacity('1'))
  ),

  rule(mod('hovered', 'yes'), [
    z('2'),
    width(726),
    height(194),
    marginLeft(-362),
    transitionDelay('0, 0, 0, 0.5s, 0'),
    transitionTimingFunction(cubicBezier(0.23, 1, 0.32, 1)),
    boxShadow('0 0 15px rgba(0, 0, 0, 0.4)')
  ]),

  rule(elem('item'), [
    absolute(),
    z('2'),
    bottom(-20),
    left('50%'),
    width(60),
    height(60),
    transition('opacity 0.4s, outline-color 0.3s, box-shadow .35s, -webkit-transform 0.5s, bottom 0.5s'),
    transitionDelay('0.7s, 0.5s, 0, 0.5s, 0.5s'),
    vendorDecl('transform', 'translateY(-29px)'),
    pointerEvents(none),
    opacity(),
    { outline: '1px solid rgba(255,255,255,0)' }
  ]),

  rule(elem('item:hover'), [
    { outline: '1px solid white' },
    boxShadow('inset 0 0 3px white, inset 0 0 0 999px rgba(0,0,0,0.5)')
  ]),

  [1,2,3,4,5].map(function(i){
    return rule(elemMod('item', 'index', i), [
      marginLeft(-168 + (i-1)*69),
      bg(url('theme-select__item_' + i + '.jpg'))
    ]);
  }),

  rule(child(mod('hovered', 'yes'), elem('item')), [
    bottom(18),
    transition('opacity 0.6s, outline-color 0.3s, box-shadow .25s, -webkit-transform 0.5s, bottom 0.5s'),
    transitionTimingFunction( cubicBezier('0.23, 1, 0.32, 1') ),
    vendorDecl('transform', 'translateY(0px)'),
    pointerEvents('auto'),
    opacity('1')
  ]),

  [1,2,3,4,5].map(function(i){
    return rule(mod('hovered', 'yes') + ' ' + elemMod('item', 'index', i), [
      transitionDelay('0.' + (1+i) + 's, 0.15s, 0.3s, 0.25s')
    ])
  }),

  rule(elem('wrap'), [
    width('100%'),
    height('100%')
  ]),

  rule(elem('bg'), [
    absolute(),
    top(),
    left(),
    width('100%'),
    height('100%'),
    transition('opacity 1.25s 0.4s')
  ]),

  rule(child(mod('state', 'loaded'), elem('bg')), [
    opacity()
  ]),

  rule([ child(mod('state', 'loaded'), elem('bg')), child(mod('theme', 1), elem('wrap')) ], [
    backgroundAttachment('local'),
    backgroundPosition('center top')
  ]),

  rule(child(mod('theme', 1), elem('wrap')), [
    backgroundImage( url('theme-select__bg_1.jpg') )
  ]),

  [1,2,3,4,5].map(function(i){
    return rule( child(mod('state', 'loaded'), elem('bg_'+i)), [
      backgroundImage( url('theme-select__bg_'+i+'.jpg') )
    ])
  }),

  [1,2,3,4,5].map(function(i){
    return rule( child(mod('theme', i), elemMod('bg', 'index', i)), [
      transition('opacity 0.65s 0.1s'),
      opacity('1')
    ]);
  }),

  [1,2,3,4,5].map(function(i){
    return rule( child(mod('theme', i), elemMod('item', 'index', i)), [
      boxShadow('inset 0 0 0 white, inset 0 0 0 999px rgba(0,0,0,0.5)')
    ]);
  })

]);
