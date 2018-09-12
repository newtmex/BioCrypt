const log = require('./lib/funcs').log;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

log(`\n`);

const run = require('./run');
run.set({
  minP: 7,
  maxP: 9.8,
  //maXtW: 72,
  //miNtW: 65
})

var limit = 6;
var verbose = true;

rl.question(`limit ${limit}? (enter the number of times you want the prediction to run, or leave it @ ${limit}): `,(ans)=>{
  if(ans != ''){
    limit = ans
  }
  rl.question(`verbose? (T or F):`,(ans)=>{
    if(ans.toLocaleLowerCase() == 'f'){
      verbose = false
    }
    rl.question(`total registered ${global.tW}? (enter the number of registered users, or leave it @ ${global.tW}): `,(ans)=>{
      if(ans != ''){
        global.tW = ans
      }
      rl.close()
    })
  })
})

rl.on('close',()=>{
  console.log('\n');

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
})