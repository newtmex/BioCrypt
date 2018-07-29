exports.log = console.log;

exports.random = function random(start,end){//Returns a random number from start to end, both included
  return Math.floor(Math.random() * (end - start + 1)) + start;
}