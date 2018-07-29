const log = console.log
function random(start,end){//Returns a random number from start to end, both included
  return Math.random() * (end - start + 1) + start;
}
const rand = random.bind(null,4.4,9.09)

var airDrT = 71428571;
var tW = 47795; // total wallets or participants
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
