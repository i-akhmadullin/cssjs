// globally load all the shit, yolo!
require('../cssjs').inject();

var bem = require('../cssjs-bem')(__filename);
var block    = bem.block;
var elem     = bem.elem;
var mod      = bem.mod;
var elemMod  = bem.elemMod;
var elemName = bem.elemName;
var modName  = bem.modName;

var child = _child;

// custom aliases
var z = zIndex;
var bg = background;

// just variable
var animationName = 'themeSelectFadeIn';


stylesheet([

  rule(block, [
    absolute(),
    top(285),
    left('50%'),
    overflow(hidden),

    fontWeight(),
    fontWeight(400),
    fontWeight(normal),

    width(),
    width(652),
    width('652px'),

    height(157),
    marginLeft(-326),
    // transition('0.5s 0.5s left')('0.5s 0.5s width')('0.5s 0.5s height')('0.5s box-shadow')('0.5s 0.5s margin-left'),
    // transition( p(0.5, 0.5, 'left'), p(0.5, 0.5, 'width'), p(0.5, 0.5, 'height'), p(0.5, 'box-shadow'), p(0.5, 0.5, 'margin-left') ),
    vendorDecl('animation', animationName, '0.4s', '3.4s', 'forwards'),
    opacity()
  ]),

  keyframes(animationName, [
    rule('from', opacity()),
    rule('to', opacity(1))
  ]),

  // rule(mod('hovered', 'yes'), [
  //   z(2),
  //   width(),
  //   height(194),
  //   marginLeft(-362),
  //   // transitionDelay(0, 0, 0, 0.5, 0'),
  //   //transitionDelay(0, 0, 0, 0.5, 0), // need separator
  //   transitionTimingFunction(cubicBezier(0.23, 1, 0.32, 1)),
  //   boxShadow(0, 0, 15, 'rgba(0, 0, 0, 0.4)')
  // ]),

  rule(elem('item'), [
    absolute(),
    z(2),
    bottom(-20),
    left('50%'),
    width(60),
    height(60),
    transition('opacity 0.4s, outline-color 0.3s, box-shadow .35s, -webkit-transform 0.5s, bottom 0.5s'),
    // transitionDelay(0.7, 0.5, 0, 0.5, 0.5), // need separator
    vendorDecl('transform', translateY(-29)),
    pointerEvents(none),
    opacity(),
    outline(1, solid, 'rgba(255,255,255,0)')
  ]),

  rule(elem('item:hover'), [
    outline(1, solid, white),
    // need multiple props support
    boxShadow('inset 0 0 3px white, inset 0 0 0 999px rgba(0,0,0,0.5)')
  ]),

  [1,2,3,4,5].map(function(i){
    return rule(elemMod('item', 'index', i), [
      marginLeft(-168 + (i-1)*69),
      bg(url(elemName('item_' + i), jpg))  // как добавить no-repeat?
    ]);
  }),

  rule(child(mod('hovered', 'yes'), elem('item')), [
    bottom(18),
    transition('opacity 0.6s, outline-color 0.3s, box-shadow .25s, -webkit-transform 0.5s, bottom 0.5s'),
    transitionTimingFunction( cubicBezier(0.23, 1, 0.32, 1) ),
    vendorDecl('transform', translateY()),
    pointerEvents(),
    opacity(1)
  ]),

  // [1,2,3,4,5].map(function(i){
  //   return rule(mod('hovered', 'yes') + ' ' + elemMod('item', 'index', i), [
  //     transitionDelay((1+i)/10, 0.15, 0.3, 0.25)
  //   ])
  // }),

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
    transition('opacity', 1.25, 0.4) // auto seconds here
  ]),

  rule(child(mod('state', 'loaded'), elem('bg')), [
    opacity()
  ]),

  rule([ child(mod('state', 'loaded'), elem('bg')), child(mod('theme', 1), elem('wrap')) ], [
    backgroundAttachment('local'),
    backgroundPosition('center top')
  ]),

  rule(child(mod('theme', 1), elem('wrap')), [
    backgroundImage( url(elemName('bg_1'),jpg) )
  ]),

  [1,2,3,4,5].map(function(i){
    return rule( child(mod('state', 'loaded'), elem('bg_'+i)), [
      backgroundImage( url(elemName('bg_'+i), jpg) )
    ])
  }),

  [1,2,3,4,5].map(function(i){
    return rule( child(mod('theme', i), elemMod('bg', 'index', i)), [
      transition('opacity', 0.65, 0.1),
      opacity(1)
    ]);
  }),

  [1,2,3,4,5].map(function(i){
    return rule( child(mod('theme', i), elemMod('item', 'index', i)), [
      boxShadow([ 'inset 0 0 0 white', 'inset 0 0 0 999px rgba(0,0,0,0.5)' ])
    ]);
  }),

  clearfix(block)

]);
