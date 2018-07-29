const log = console.log
function random(start,end){//Returns a random number from start to end, both included
  return Math.random() * (end - start + 1) + start;
}

// Set the minimum and maximum percentage to chose randomly from for each of the groups
const minP = 4.4
const maxP = 9.09
const rand = random.bind(null,minP,maxP)

const airDrT = 71428571;
var tW = 30000; // total wallets or participants, put any number you feel will be the total amount of registerd participants
var tDDSS = 46780356295;
var airDrA;
var groups = [];
var group = 0;
var userPerGrp = [];

// Build groups
while(group <= 100){
  let grp = group
  group += 10;
  let val = 1 + (grp / 100)
  groups.push(val)
}
// Build userPerGrp
var totalPercent = 0
userPerGrp = groups.map(function(grp, index){
  let p;
  if(index == 10){
    p = (100 - totalPercent);
  }else{
    p = rand();
    totalPercent += p
  }

  return (p / 100) * tW
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

log(`Total remaining for bonuses: ${airDrT - (airDrA * tW)}`)
