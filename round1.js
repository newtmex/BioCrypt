const log = require('./lib/funcs').log;

log(`\n\n`);

const run = require('./run');
run.set({
  minP: 7,
  maxP: 9.8,
  //maXtW: 72,
  //miNtW: 65
})

var limit = 6;
var verbose = false;

if(!verbose){
  var results = [];
  for(let i=0; i < limit; i++){
    let result = run();
    results.push([result.tW,result.airDrA])
  }
  
  results.sort(function(a,b){
    return a[0] - b[0]
  })
  
  results.forEach(function(item){
    setImmediate(function(item){
      log(`Total reg: ${item[0]}, \tEach gets: ${item[1]}`)
    },item)
  })
}else{

  for(let i=0; i < limit; i++){
    run(true)
  }
}