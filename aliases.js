function positionAlias(pos){
  return { position: pos };
}

module.exports = {
  positionAlias: positionAlias,

  position:   positionAlias,
  absolute:   positionAlias.bind(null, 'absolute'),
  fixed:      positionAlias.bind(null, 'fixed'),
  relative:   positionAlias.bind(null, 'relative')
};
