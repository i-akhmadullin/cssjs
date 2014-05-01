function elem(block, elemName){
  return block + '__' + elemName;
};

function mod(block, modName, modVal){
  return block + '_' + modName + '_' + modVal;
};

function elemMod(block, elemName, modName, modVal){
  return mod(elem(block, elemName), modName, modVal);
};

exports.bemHelpers = {
  _elem: elem,
  _mod: mod,
  _elemMod: elemMod,
}