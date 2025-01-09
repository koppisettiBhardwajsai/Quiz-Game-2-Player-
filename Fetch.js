const name1 = localStorage.getItem('Player1');
const name2 = localStorage.getItem('Player2');
const category=localStorage.getItem('Category');
// console.log(category);
const player1Data=JSON.parse(name1);
const player2Data=JSON.parse(name2);
let questions = []
let currentQuestion=0;
let totalQuestions=6;
let currentPlayer=player1Data;
async function fetchData() {
    try {
        const res = await fetch(`https://the-trivia-api.com/v2/questions?categories=${category}&difficulty=easy&limit=6`)
        if (!res.ok) {
            alert('Error Fetching questions');
        }
        const data = await res.json();
        questions.push(...data);
        console.log(questions[0]);
    } catch (error) {
        alert(error);
        await new Promise(resolve=>setTimeout(resolve,3000))
    }
    if(questions.length == 0){
        alert("Failed to fetch questions. Try Again!!!");
        return;
    }
    currentQuestion=0;
    questionDisplay();
}
fetchData();

function questionDisplay(){
    document.getElementById('waivy').style.display='none';
    document.getElementById('questionbox').classList.remove('hidden');
 if(currentQuestion>=totalQuestions){
    localStorage.setItem('Player1',JSON.stringify(player1Data));
    localStorage.setItem('Player2',JSON.stringify(player2Data));
    window.location.href='GameEndOrCon.html';
    return;
 }
 const questionObject=questions[currentQuestion];
 const questionText=questionObject.question.text;
 const correctAnswer=questionObject.correctAnswer;
 const allAnswers=[...questionObject.incorrectAnswers,correctAnswer].sort(()=>Math.random()-0.5);

 document.getElementById('Name').textContent=`${currentPlayer.name}'s Turn!`;
 document.getElementById('question').innerHTML=questionText;

 const answersDivision=document.getElementById('answer');
 answersDivision.innerHTML='';

 allAnswers.forEach(answer=>{
    const answerButton=document.createElement('button');
    answerButton.textContent=answer;
    answerButton.onclick=()=> checkAnswer(answer,correctAnswer);
    answersDivision.appendChild(answerButton);
 })
}

function checkAnswer(playerAnswer, correctAnswer){
    const revealingAnswer=document.getElementById('reveal');
    let scoreIncrement=0;

    if(currentQuestion<2){
        scoreIncrement=10;
    }else if(currentQuestion<4){
        scoreIncrement=15;
    }else{
        scoreIncrement=20;
    }

    if(playerAnswer === correctAnswer){
        revealingAnswer.textContent='Correct Answer!!!';
        currentPlayer.score+=scoreIncrement;
        console.log(`${currentPlayer.name}:${currentPlayer.score}`)
    }else{
        revealingAnswer.textContent=`Wrong Answer, The correct answer is ${correctAnswer}`;
    }

    currentPlayer= currentPlayer === player1Data?player2Data:player1Data;
    currentQuestion++;

    setTimeout(()=>{
        revealingAnswer.textContent=''
        questionDisplay();
    },3000);
}



