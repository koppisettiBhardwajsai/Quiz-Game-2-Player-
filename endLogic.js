const score1=localStorage.getItem('Player1');
const score2=localStorage.getItem('Player2');
const catValue=localStorage.getItem('Category');
const cat=localStorage.getItem('CatValues');
const catArray=JSON.parse(cat);
const player1=JSON.parse(score1);
const player2=JSON.parse(score2);
// console.log(player1.score);
// console.log(player2.score);
console.log(catArray,catValue);
const home=document.getElementById("home");

if(confirm('Do you want to continue')){
    if(!catArray.length){
        alert('No more categories are left');
        endGame();
    }
    else{
    let index=catArray.indexOf(catValue);
    if(index>-1){
    catArray.splice(index,1);
    localStorage.setItem('CatValues',JSON.stringify(catArray));
    }
    window.location.href="index.html";
}
}
else{
 endGame();
}

function endGame(){
    let scores=`${player1.name} scored: ${player1.score}<br>${player2.name} scored: ${player2.score}<br><br>`;
let result=''
if(player1.score>player2.score){
    result+=`${player1.name} wins!!!`
}else if(player1.score<player2.score){
    result+=`${player2.name} wins!!!`
}else if(player1.score === player2.score){
    result+=`Tie !!!`
}
document.getElementById('finalScore').innerHTML=scores+result;
home.addEventListener('click',()=>{
    window.location.href='index.html';
    localStorage.removeItem('Player1');
    localStorage.removeItem('Player2');
    localStorage.removeItem('Category');
    localStorage.removeItem('CatValues');
})
}