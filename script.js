const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn= document.querySelector('.exit');
const main = document.querySelector('.main');
const continueBtn = document.querySelector(".continue");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn= document.querySelector(".tryAgain-btn");
const goHomeBtn= document.querySelector(".goHome-btn");
const Timer = document.querySelector('.timer');
const submitBtn = document.querySelector('.submit-btn');
const Course= document.querySelector('.course');



startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => { 
    quizSection.classList.add('active');
    Course.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
   

   
}

submitBtn.onclick = () =>{
    Timer.classList.add('active');
    quizBox.classList.add("active");
    Course.classList.remove('active');
    showQuestions(0);
    questionCounter(1);
    headerScore();
    watchStart();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumber);
    headerScore();
    watchReset();
    watchStart();
}

goHomeBtn.onclick = () => {
    Timer.classList.remove('active');
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumber);
    headerScore();
    watchReset();
}

let questionCount = 0;
let questionNumber = 1;
let userScore =0;

const nextBtn = document.querySelector('.next-btn');
nextBtn.onclick = () =>{
    if(questionCount < questions.length - 1){
    questionCount++;
    showQuestions(questionCount);
    questionNumber++;
    questionCounter(questionNumber);
    nextBtn.classList.remove('active');
    }
    else {
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;     
    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }           

}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    if (userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');
        for(let i= 0; i < allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class','option correct');
            }
        }
    }

    for(let i= 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}


function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    watchStop();
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score is ${userScore} out of ${questions.length}`;
    const circleProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
   
    let progressStartValue = -1;
    let progressEndValue= (userScore/questions.length) * 100;
    let speed=20;
    
    let progress = setInterval(() => {
        progressStartValue++;
        //console.log(progressStartValue);
        progressValue.textContent =`${progressStartValue}%`;
        circleProgress.style.background =` conic-gradient(#0c80ef ${progressStartValue * 3.6}deg, #EEEEFF 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    },speed);
}



let [seconds, minutes, hours] = [0,0,0];
let displayTime = document.getElementById("displayTime");
let timer=null;

function stopwatch(){
    seconds++;
    if (seconds == 60){
        seconds = 0;
        minutes++;
        if (minutes == 60){
            minutes=0;
            hours++;
        }
    }
    let h = hours < 10 ? "0" + hours :hours;
    let m = minutes <10 ? "0" + minutes : minutes;
    let s = seconds <10 ? "0" + seconds : seconds;

    displayTime.innerHTML = h +":"+ m +":"+ s;
}

function watchStart(){
    if (timer !==null)
    {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch,1000);
}

function watchStop(){
    clearInterval(timer);
}

function watchReset(){
    clearInterval(timer);
    [seconds, minutes, hours] = [0,0,0];
    displayTime.innerHTML ="00:00:00";
}


let questions = [
    {
        numb:1,
        question:"What does the abbrevation HTML stand for?",
        answer:"B. Hyper Text Markup Language",
        options: [
            "A. Hyper Type Multi Language",
            "B. Hyper Text Markup Language",
            "C. Hyper Tool Multiple Language",
            "D. Home Tool Multi Language"
        ]
    },
    {
        numb:2,
        question:"Who is making the Web standards?",
        answer:"B. The World Wide Web Consortium",
        options: [
            "A. Google",
            "B. The World Wide Web Consortium",
            "C. Mozilla",
            "D.Microsoft"
         ]
    },
    {
        numb:3,
        question:"Choose the correct HTML element for the largest heading:",
        answer:"A. < h1 >",
        options: [
            "A. < h1 >",
            "B. < head >",
            "C. < h6 >",
            "D. < heading >"
        ]
    },
    {
        numb:4,
        question:"What is the correct HTML element for inserting a line break?",
        answer:"B. < br >",
        options: [
            "A. < break >",
            "B. < br >",
            "C. < lb >",
            "D. < breakline >"
        ]
    },
    {
        numb:5,
        question:"Which character is used to indicate an end tag?",
        answer:"A. /",
        options: [
            "A. /",
            "B. *",
            "C. $",
            "D. <"
        ]
    },
    {
        numb:6,
        question:"How to create an ordered list in HTML?",
        answer:"B. < ol >",
        options: [
            "A. < ul >",
            "B. < ol >",
            "C. < href >",
            "D. < b >"
        ]
    },
    {
        numb:7,
        question:"How many sizes of headers are available in HTML by default?",
        answer:"D. 6",
        options: [
            "A. 1",
            "B. 5",
            "C. 3",
            "D. 6"
        ]
    },
    {
        numb:8,
        question:"HTML files are saved by default with the extension?",
        answer:"A. .html",
        options: [
            "A. .html",
            "B. .h",
            "C. .ht",
            "D. None of the above"
        ]
    },
    {
        numb:9,
        question:"We enclose HTML tags within?",
        answer:"B. < >",
        options: [
            "A. { }",
            "B. < >",
            "C. ! !",
            "D. None of the above"
        ]
    },
    {
        numb:10,
        question:"Which of the following tags does not require a closing tag?",
        answer:"C. Both A and B",
        options: [
            "A. < br >",
            "B. < hr >",
            "C. Both A and B",
            "D. None of the Above"
        ]
    }
]


