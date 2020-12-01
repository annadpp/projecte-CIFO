const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;

//push the questions into availableQuestions array
function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

//set question number and question and options
function getNewQuestion() {
  //set question text (random question)
  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.question;
  //get the position of "questionIndex" from the availableQuestion array
  const index1 = availableQuestions.indexOf(questionIndex);
  //remove the 'questionIndex' from the availableQuestion array, so that the question does not repeat
  availableQuestions.splice(index1, 1);

  //set options (get the length of options)
  const optionLen = currentQuestion.options.length;
  //push options into availableOptions array
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }

  optionContainer.innerHTML = "";

  let animationDelay = 0.15;
  //create options in html
  for (let i = 0; i < optionLen; i++) {
    //random option
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    //get the position of optionIndex from the availableOptions
    const index2 = availableOptions.indexOf(optionIndex);
    //remove the optionIndex from the available Options, so that the option does not repeat
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onClick", "getResult(this)");
  }

  questionCounter++;
}

//get the result of current attempt question
function getResult(element) {
  const id = parseInt(element.id);
  //get the answer by comparing the correct option
  if (id === currentQuestion.answer) {
    //set the green color to the correct option
    element.classList.add("correct");
    correctAnswers++;
    console.log("correct" + correctAnswers);
  } else {
    //set the red color to the incorrect option
    element.classList.add("wrong");
  }

  unclickableOptions();
}

//make all the options unclickable once the user selects a option
function unclickableOptions() {
  const optionLen = optionContainer.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
}

function next() {
  if (questionCounter === quiz.length) {
    console.log("quiz over");
    quizOver();
  } else {
    getNewQuestion();
  }
}

function quizOver() {
  //hide quiz quizBox
  quizBox.classList.add("hide");
  //show result Box
  resultBox.classList.remove("hide");
  quizResult();
}

function quizResult() {
  //ACABAR BOTONES
  if (correctAnswers === 5) {
    resultBox.querySelector(".total-score").innerHTML =
      correctAnswers + " / " + quiz.length;
    resultBox.querySelector(".btn").innerHTML = "¡Sigue la historia!";
    resultBox.querySelector(".image-end").src = "images/quizbien.jpg";
  } else {
    resultBox.querySelector(".total-score").innerHTML =
      correctAnswers + " / " + quiz.length;
    resultBox.querySelector(".btn").innerHTML = "Vuelve a intentarlo";
    resultBox.querySelector(".image-end").src = "images/quizmal.jpg";
  }
}

function btnEnd() {
  if (resultBox.querySelector(".btn").innerHTML === "¡Sigue la historia!") {
    window.location.href = "cap3.html";
  } else {
    tryAgainQuiz();
  }
}

function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
}

function tryAgainQuiz() {
  //hide the resultBox
  resultBox.classList.add("hide");
  //show the quizBox
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}

//onClick html btnEnd() -> if innerHTML tryAgainQuiz() else nextPage()

//STARTING POINT
function startQuiz() {
  //hide home box
  homeBox.classList.add("hide");
  //show quiz box
  quizBox.classList.remove("hide");

  //first we will set all questions in availableQuestions array
  setAvailableQuestions();
  //second we will call getNewQuestion function
  getNewQuestion();
}
