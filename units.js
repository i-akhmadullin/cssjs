// '50%' -> '50%',  50-> '50px'
function px(units){
  return Array.isArray(units) ? units.map(function(unit){
    return (typeof unit === 'string') ? unit : (unit ? (unit + 'px') : 0);
  }) : (typeof units === 'string') ? units : (units ? (units + 'px') : 0);
}
function pct(units){
  return Array.isArray(units) ? units.map(function(unit){
    return (typeof unit === 'string') ? unit : (unit ? (unit + '%') : 0);
  }) : (typeof units === 'string') ? units : (units ? (units + '%') : 0);
}
function seconds(units){
  return Array.isArray(units) ? units.map(function(unit){
    return (typeof unit === 'string') ? unit : (unit ? (unit + 's') : 0);
  }) : (typeof units === 'string') ? units : (units ? (units + 's') : 0);
}
function nounit(units){
  return Array.isArray(units) ? units.map(function(unit){
    return (typeof unit === 'string') ? unit : (unit ? (unit) : 0);
  }) : (typeof units === 'string') ? units : (units ? (units) : 0);
}

module.exports = {
  px:      px,
  pct:     pct,
  seconds: seconds,
  nounit:  nounit
};
