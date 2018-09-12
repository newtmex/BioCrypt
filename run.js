require('./lib/Array.mod');
const log = require('./lib/funcs').log;
const random = require('./lib/funcs').random;
// Set the minimum and maximum percentage to chose randomly from for each of the groups
global.minP = 5.7;
global.maxP = 91;// Maximum percentage should not be > 100/11
var rand = random.bind(null,minP,maxP);

const airDrT = 71428571;
global.maXtW = 47795;
global.miNtW = 10000;
global.tW = random(miNtW,maXtW); // total wallets or participants, put any number you feel will be the total amount of registerd participants

function run(verbose){
  
  var tDDSS = 46780356295;
  var airDrA;
  var groups = [];
  var group = 100;
  var userPerGrp = [];
  if(verbose) log(`Total registered ${tW}\n`);
  // Build groups
  while(group >= 0){
    let grp = group
    group -= 10;
    let val = 1 + (grp / 100)
    groups.push(val)
  }
  
  // Build userPerGrp
  userPerGrp.length = groups.length
  var percents = [];
  groups.randForEach(function(item,index,that){
    let totalPercent = (percents.length == 0) ? 0 : percents.reduce((p,c)=>{return p + c});
    let p;
    p = Math.ceil(rand());
    // Adjust p
    if((totalPercent + p) > 100){
      p = Math.ceil(Math.random() * (100 - totalPercent));
      if(verbose) log('! '+p,that.length);
    }
    if(that.length == 0 && totalPercent < 100){
      p = 100 - totalPercent;
      if(verbose) log('!! '+p,that.length);
    }
    percents[index] = p;
  
    userPerGrp[index] = (p * tW)/ 100
  })
  
  // The multiplier array
  var multi = [];
  for(let i = 0; i < groups.length; i++){
    let thisMulti = groups[i] * userPerGrp[i];
    multi.push(thisMulti)
  }
  
  var factor = multi.reduce((p,c)=> p+c);
  
  airDrA = airDrT / factor
  if(!verbose){
    return {
      airDrA,
      tW
    }
  }
  //Airdrop coins forEach participant
  if(verbose){
    log(`Each participant gets: ${airDrA} (excluding bonus based on ddss)`)
    
    log(`Total to distribute: ${airDrA * tW} (excluding bonus based on ddss)`)
    
    log(`Total remaining for bonuses: ${airDrT - (airDrA * tW)}\n`);

    // Break down of what each group will receive
    var totalDistributed = 0
    var totalParticipants = 0
    groups.forEach((ratio,index)=>{
      let eachAirDrA = airDrA * ratio;
      let totalAirDrA = eachAirDrA * userPerGrp[index]
        log(`Group ${(10-index)*10}% will receive: ${eachAirDrA} each, hence total reserved for this group is: ${totalAirDrA}.
        This group has ${userPerGrp[index]} participants`);
      totalDistributed += totalAirDrA;
      totalParticipants += userPerGrp[index];
    });
    log(`\nTotal distributed: ${totalDistributed} (out of ${airDrT})`);
    log(`Total participants: ${userPerGrp.reduce((p,c)=> p+c)} (out of ${tW})`); 
  } 
}

run.set = function(obj){
  for(let prop in obj){
    global[prop] = obj[prop]
  }
  rand = random.bind(null,minP,maxP);
}

module.exports = run