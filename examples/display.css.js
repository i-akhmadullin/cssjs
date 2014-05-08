// globally load all the shit, yolo!
require('../cssjs').inject();

var bem = require('../cssjs-bem')(__filename);
var block     = bem.block;
var blockName = bem.blockName;

var anim_name = 'displayAppear';

stylesheet([

  rule(block, [
    width(762),
    height(544),
    margin(0, auto),
    vendorDecl('transform', translateY('-200%')),
    // vendor decl должен проставлять единицы поумолчанию
    vendorDecl('animation', anim_name, '0.6s', '2s', cubicBezier(0.075, 0.82, 0.165, 1), 'forwards'),
    opacity(),
    background(url(blockName,png), noRepeat)
  ]),

  keyframes(anim_name, [
    rule('30%', [
      opacity(0.8)
    ]),
    rule('100%', [
      vendorDecl('transform', translateY()),
      opacity(1)
    ])
  ]),

  clearfix(block)

])
