var _ = require('lodash');

function elem(block, elemName){
  return block + '__' + elemName;
}

function mod(block, modName, modVal){
  return block + '_' + modName + '_' + modVal;
}

function elemMod(block, elemName, modName, modVal){
  return mod(elem(block, elemName), modName, modVal);
}

module.exports = function(filepath){
  var blockName = require('path').basename(filepath, '.css.js');
  var block = '.' + blockName;

  return {
    block:       block,
    blockName:   blockName,

    elem:        elem.bind(null, block),
    elemName:    elem.bind(null, blockName),

    elemMod:     elemMod.bind(null, block),
    elemModName: elemMod.bind(null, blockName),

    mod:         mod.bind(null, block),
    modName:     mod.bind(null, blockName),
  }
};
