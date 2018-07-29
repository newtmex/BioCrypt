
module.exports = (function (){
  Array.prototype.randForEach = function(cb){
    // This invokes cb with a random item from the array
    function rand(start,end){//Returns a random number from start to end, both included
      return Math.floor(Math.random() * (end - start + 1)) + start;
    }
    var newThis = [];
    this.forEach(i=>newThis.push(i));

    for(let i = 0; i < this.length; i++){
        var item = newThis.splice(rand(0,newThis.length - 1),1)[0];
        var index = this.indexOf(item);
        cb.call(this,item,index,newThis); // Invoke the cb in the context of newthis,
    }
  }
}())
