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

var anim_name = 'displayAppear';

stylesheet([

  rule(block, [
    width(762),
    height(544),
    margin('0 auto'),
    vendorDecl('transform', 'translateY(-200%)'),
    vendorDecl('animation', anim_name+' '+'0.6s 2s'+cubicBezier('0.075, 0.82, 0.165, 1')+'forwards'),
    opacity(),
    background(url('display.png')+' no-repeat')
  ]),

  at(vendorProp('keyframes '+ anim_name), [
    rule('30%', [
      opacity('0.8')
    ]),
    rule('100%', [
      vendorDecl('transform', 'translateY(0)'),
      opacity('1')
    ])
  ])
])