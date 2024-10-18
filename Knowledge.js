let player1 = { name: '', score: 0 };
let player2 = { name: '', score: 0 };
let currentPlayer = player1;
let currentQuestion = 0;
let questions = [];
const totalQuestions = 6; 
let selectedCategory = '9'; 
const loader=document.getElementById('waviy');


function startGame() {
    player1.name = document.getElementById('player1Name').value;
    player2.name = document.getElementById('player2Name').value;
    selectedCategory = document.getElementById('categorySelect').value;

    if (!player1.name || !player2.name) {
        alert("Please enter names for both players.");
        return;
    }

    
    document.getElementById('waviy').classList.remove('hidden');
    document.getElementById('waviy').style.display = "flex";
    document.getElementById('welcome').classList.add('hidden');
    document.getElementById('playerNames').classList.add('hidden');

    fetchTriviaQuestions();
}


async function fetchTriviaQuestions() {
    const difficulties = ['easy', 'medium', 'hard'];
    questions = []; 

    for (const difficulty of difficulties) {
        try {
            
            const response = await fetch(`https://opentdb.com/api.php?amount=2&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`);
            if (!response.ok) {
                throw new Error(`Error fetching ${difficulty} questions: ${response.statusText}`);
            }
            const data = await response.json();
            questions.push(...data.results);
        } catch (error) {
            console.error('Error fetching trivia questions:', error);
            
            await new Promise(resolve => setTimeout(resolve, 3000)); 
            difficulties.push(difficulty); 
            continue; 
        }
    }

    if (questions.length === 0) {
        alert("Failed to fetch questions. Please try again later.");
        return;
    }

    
    document.getElementById('waviy').classList.add('hidden');
    document.getElementById('waviy').style.display = "none";
    document.getElementById('game').classList.remove('hidden');

    currentQuestion = 0; 
    askQuestion();
}



function askQuestion() {
    if (currentQuestion >= totalQuestions) {
        declareWinner();
        return;
    }
    const questionObj = questions[currentQuestion];
    const questionText = questionObj.question;
    const correctAnswer = questionObj.correct_answer;
    const allAnswers = [...questionObj.incorrect_answers, correctAnswer].sort(() => Math.random() - 0.5);

    
    document.getElementById('currentPlayer').textContent = `${currentPlayer.name}'s turn!`;
    document.getElementById('question').innerHTML = questionText;

    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';

    allAnswers.forEach((answer) => {
        const answerButton = document.createElement('button');
        answerButton.textContent = answer;
        answerButton.onclick = () => checkAnswer(answer, correctAnswer);
        answersDiv.appendChild(answerButton);
    });
}



function checkAnswer(playerAnswer, correctAnswer) {
    const feedback = document.getElementById('feedback');
    let scoreIncrement = 0;

    
    if (currentQuestion < 2) {
        scoreIncrement = 10;  
    } else if (currentQuestion < 4) {
        scoreIncrement = 15;  
    } else {
        scoreIncrement = 20;  
    }

    if (playerAnswer === correctAnswer) {
        feedback.textContent = "Correct answer!";
        currentPlayer.score += scoreIncrement; 
    } else {
        feedback.textContent = `Wrong answer! The correct answer was: ${correctAnswer}`;
    }

    
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentQuestion++;

    setTimeout(() => {
        feedback.textContent = '';
        askQuestion();
    }, 3000);
}



function declareWinner() {
    document.getElementById('game').classList.add('hidden');
    document.getElementById('gameOver').classList.remove('hidden');

    const finalScoreText = `${player1.name} scored: ${player1.score}<br>${player2.name} scored: ${player2.score}<br>`;
    let winnerText = '';

    if (player1.score > player2.score) {
        winnerText = `${player1.name} wins!`;
    } else if (player2.score > player1.score) {
        winnerText = `${player2.name} wins!`;
    } else {
        winnerText = "It's a tie!";
    }

    document.getElementById('finalScore').innerHTML = finalScoreText + winnerText;
}


function restartGame() {
    
    player1.score = 0;
    player2.score = 0;
    currentQuestion = 0;
    currentPlayer = player1;
    questions = []; 

    
    document.getElementById('gameOver').classList.add('hidden');
    document.getElementById('playerNames').classList.remove('hidden');
    document.getElementById('welcome').classList.remove('hidden');
    document.getElementById('welcome').style.display = 'block';

    
    document.getElementById('player1Name').value = '';
    document.getElementById('player2Name').value = '';
    document.getElementById('question').innerHTML = ' ';
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
}
