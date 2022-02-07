
function init(){
    console.log('loaded');    
}

var gArrGameNum = []
function originalArr(num){    
    for (var i=0; i<num; i++){
        gArrGameNum.push((i+1))
    }
}
// console.log('gArrGameNum ', gArrGameNum);

function createDLevel(num){
    originalArr(num)
    var arrNums = []
    for (var i=0; i<num; i++){
        arrNums.push((i+1))
    }    
    shuffle(arrNums)
    // console.log('arrNums ', arrNums);
    createTableGame(arrNums)
    return arrNums
}


function createTableGame(num){
    // console.log(num.length);
    var strHtml = ''
    var tLength = Math.sqrt(num.length)
    // console.log('tLength ', tLength);
    var counter = 0
    for (var i=0; i<tLength; i++){
        strHtml += `<tr>`
        for (var j=0; j<tLength; j++){
            strHtml += `<td class="tdGame" onclick="checkNumber(this, innerText)" data-arrNum="${num[counter]}">${num[counter]}</td>`
            counter ++
        }
        strHtml += `</tr>`
    }
    // console.log(strHtml);
    var elTable = document.querySelector('.gameTable')
    elTable.innerHTML = strHtml
    return strHtml
}

var gCurrNum = 0
function checkNumber(tdNum, pressNum){
    // console.log('the user press ', pressNum);
    // console.log('gArrGameNum[gCurrNum] ', gArrGameNum[gCurrNum]);
    var eltdNext = document.querySelector('.tdNext')
    if (pressNum==gArrGameNum[gCurrNum]){
        tdNum.style.backgroundColor = 'lightgoldenrodyellow'
        gCurrNum++
        eltdNext.innerText = (gCurrNum+1)
        if(gCurrNum==1) startTimmer()
    }
    if (pressNum==gArrGameNum.length){
        tdNum.style.backgroundColor = 'green'
        eltdNext.innerText = 'Finish - Excellent!!'
        gCurrNum=0
    }
}



function startTimmer (){
//  console.log('i well start'); 
//  var d = new Date();
//  var timeStart = d.getTime()
 var elTime = document.querySelector('.tdTime')
 var zeroNum = 0
 setInterval(()=> {
    elTime.innerHTML = zeroNum++
    if(zeroNum==60){
        zeroNum = 0
        elTime.innerHTML = `01:${zeroNum++}`
    }
    }, 1000)
}

function conutTime(time){
//  var d = new Date();
//  var seconds = d.getTime()
//  var delay = ((seconds - time)/60)
//  console.log('delay ', delay);
 
}


function shuffle(items) {
    var randIdx, keep
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }