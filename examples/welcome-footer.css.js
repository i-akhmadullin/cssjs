// globally load all the shit, yolo!
require('../cssjs').inject();

var b = require('../cssjs-bem')(__filename);
var block = b.block;
var elem = b.elem;
var mod = b.mod;
var elemMod = b.elemMod;

var child = _child.bind(null, block);


stylesheet([

  rule(block, [
    display('inline-block'),
    marginTop(46),
    color(999),
    fontSize(14),
    lineHeight(25)
  ]),

  rule(child('a:first-child'), [
    marginLeft()
  ]),

  rule(child('a'), [
    marginLeft(26)
  ]),

  rule([child('a'),
    child('a'+link),
    child('a'+visited),
    child('a'+active),
    child('a'+hover)], [

    textDecoration(none),
    color(666),
    borderBottom(1, solid)
  ]),

  rule(child('strong'), [
    fontWeight(normal)
  ]),

  // ie?
  rule(child('.b-link'), [
    display('inline'),
    zoom('1')
  ])

])
