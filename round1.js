const log = console.log
log(`\n\n`)
function random(start,end){//Returns a random number from start to end, both included
  return Math.random() * (end - start + 1) + start;
}

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

// Set the minimum and maximum percentage to chose randomly from for each of the groups
const minP = 8.1
const maxP = 9.09// Maximum percentage should not be > 100/11
const rand = random.bind(null,minP,maxP)

const airDrT = 71428571;
var tW = 30000; // total wallets or participants, put any number you feel will be the total amount of registerd participants
var tDDSS = 46780356295;
var airDrA;
var groups = [];
var group = 100;
var userPerGrp = [];

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
    p = Math.floor(Math.random() * (100 - totalPercent));
    log('! '+p,that.length)
  }
  if(that.length == 0 && totalPercent < 100){
    p = 100 - totalPercent;
    log('!! '+p,that.length)
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
//Airdrop coins forEach participant
log(`Each participant gets: ${airDrA} (excluding bonus based on ddss)`)

log(`Total to distribute: ${airDrA * tW} (excluding bonus based on ddss)`)

log(`Total remaining for bonuses: ${airDrT - (airDrA * tW)}\n`)

// Break down of what each group will receive
var totalDistributed = 0
var totalParticipants = 0
groups.forEach((ratio,index)=>{
  let eachAirDrA = airDrA * ratio;
  let totalAirDrA = eachAirDrA * userPerGrp[index]
  log(`Group ${11-index} will receive: ${eachAirDrA} each, hence total reserved for this group is: ${totalAirDrA}.
  This group has ${userPerGrp[index]} participants`);
  totalDistributed += totalAirDrA
  totalParticipants += userPerGrp[index]
})
log(`\nTotal distributed: ${totalDistributed} (out of ${airDrT})`);
log(`Total participants: ${userPerGrp.reduce((p,c)=> p+c)} (out of ${tW})`);

