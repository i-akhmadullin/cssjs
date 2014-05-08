require('../cssjs').inject();

var bem = require('../cssjs-bem')(__filename);
var block     = bem.block;
var blockName = bem.blockName;
var elem      = bem.elem;
var elemMod   = bem.elemMod;
var elemName  = bem.elemName;

var tac = { 'text-align': center };

stylesheet([
  rule(block, [
    fontSize(16),
    lineHeight(20),
    marginTop(15),
    width(280)
  ]),

  rule(elem('clear'), [
    top('50%'),
    left('100%'),
    display('block'),
    height(34),
    margin(-17, 0, 0, 17),
    background(white, url(elemName('clear'), png))
  ]),

  rule(elem('inner'), [
    absolute(),
    top(16),
    left(51),
    width(292),
    height(178),
    borderRadius(4),
    boxShadow(0, '1px', '3px', 'rgba(0, 0, 0, .5)', 'inset')
  ]),

  rule(elemMod('inner', 'hovered', 'yes'), [
    fontSize(36),
    fontWeight(400),
    margin(),
    padding(35, 0, 0),
    tac,
    color(white)
  ]),
]);


