exports.getArrayArgs = function getArrayArgs(args, sliceFrom){
  return Array.prototype.slice.call(args, sliceFrom);
};
