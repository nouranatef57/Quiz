const progressBar = document.querySelector(".progress-bar"),
progressText = document.querySelector(".progress-Text");

const progress = (value) => {
    const percentage = (value / time) * 100;
    progressBar.computedStyleMap.width = `${percentage}%`;
    progressText.innerHTML = `${value}`;
};

let questions = [],
time = 30,
score = 0,
currentQuestion,

const startBtn = document.querySelector(".start"),
numQuestions = document.querySelector(".num-questions"),
category = document.querySelector(".category"),
difficulty = document.querySelector("difficulty"),
timePerQuestion = document.querySelector("#time"),
quiz=document.querySelector(".quiz"),
startscreen = document.querySelector(".start-screen");

const startQuiz = () => {
    const num = numQuestions.value;
    cat = category.value;
    diff = difficulty.value;
    const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
    questions = data.results;
   startScreen.classList.add("hide");
   quiz.classList.remove("hide");
   currentQuestion = 1;
   showQuestion(questions[0]);
});
};

startBtn.addEventListener("click",startQuiz);
const submitBtn = document.querySelector(".submit"),
nextBtn = document.querySelector(".next");

const showQuestion = (question) => {
    const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper"),
    questionNumber = document.querySelector(".number");

    questionText.innerHTML = [
        ...question.incorrect-answers,
        question.correct-answer.toString(),
    ];

    answers.sort(() => Math.random () - 0.5);
    answersWrapper.innerHTML = "";
    answers.forEach ((answer) => {
        answersWrapper.innerHTML += 
        <div class= "answer ">
        <span class="text">${answer}</span>
        <span class ="checkbox">
        <span class="icon">✔</span>
        </span>
        </div>
        ;
    })
}

const answersDiv = document.querySelectorAll(".answer");
answersDiv.forEach((answer) =>{
    if (!answer.classList.contains("checked")){
        answersDiv.forEach((answer) => {
            answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
    }
});

time = timePerQuestion.value;
startTimer(time);

const startTimer = (time) => {
    timer = setInterval (() => {
        if (time > 0){

            progress(time);
            time--;

        } else {
            checkAnswer();
        }
    }, 1000);
};

submitBtn.addEventListener("click", () => {
    checkAnswer();
});
const checkAnswer = () => {
    clearInterval(timer);

    const answer = selectedAnswer.querySelector(".answer.selected");

    if (selectedAnswer) {
        const answer = selectedAnswer.querySelector(".text");
        if (answer === questions [currentQuestion -1].correct-answer){
            score++;
            selectedAnswer.classList.add("wrong");
            const correctAnswer = document.querySelectorAll(".answer")
            .forEach((answer) => {
                if (
                    answer.querySelector(".text").innerHTML ===
                    questions[currentQuestion -1].correct-answer
                ) {
                    answer.classList.add("correct")
                }
            });
        }
    }
    else{

        const correctAnswer = document
        .querySelectorAll(".answer")
        .forEach((answer) => {
        if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion -1].correct-answer
            ) {
            answer.classList.add("correct");
            }});
        
    }

    const answersDiv =document.querySelectorAll(".answer");
    answersDiv.forEach((answer) => {
        answer.classList.add("checked");
    });
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
};

nextBtn.addEventListener("CLICK",() =>  {
    nextQuestion();

    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
});

const nextQuestion = ( => {
    if (currentQuestion < questions.length) {
        currentQuestion++;

        showQuestion (questions[currentQuestion - 1]);
    } else {
    showScore();
    }
});
const endScreen = document.querySelector(".end-screen"),
finalScore = document.querySelector(".final-score"),
totalScore = document.querySelector(".total-score");

const showScore = () => {
    endScreen.classList.remove("hide");
    quiz.classList.add("hide"); 
    finalScore.innerHTML = score;
    totalScore.innerHTML = `/${questions.length}`;
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
    window.location.reload();
});
