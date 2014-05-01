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
    child('a:link'),
    child('a:visited'),
    child('a:active'),
    child('a:hover')], [

    textDecoration(none),
    color(666),
    borderBottom('1px solid')
  ]),

  rule(child('strong'), [
    fontWeight(normal)
  ]),

  // ie(
  //   rule(child('.b-link'), [
  //     display('inline'),
  //     zoom('1')
  //   ])
  // )

])
