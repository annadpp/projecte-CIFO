/*ESCONDER SPLASH*/
function empieza() {
  document.getElementById("splash").classList.toggle("fade");
}

/*FLECHAS Y REDIRECCIONES*/
/*Volver a portada*/
function cover() {
  location.replace("index.html");
}

/*Volver a inicio*/
function inicio() {
  location.replace("index.html#splash");
}

/*Volver a índice*/
function indice() {
  location.replace("indice.html#splash");
}

/*Volver a capítulo 1*/
function cap1() {
  location.replace("cap1.html#splash");
}

/*Volver a capítulo 2a*/
function cap2a() {
  location.replace("cap2a.html");
}

/*Volver a capítulo 2b*/
function cap2b() {
  location.replace("cap2b.html");
}

/*Volver a capítulo 1*/
function cap3() {
  location.replace("cap3.html");
}

/*MENÚ HAMBURGUESA*/
function onClickMenu() {
  document.getElementById("menu").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
  document.getElementById("sub-bg").classList.toggle("change-bg");
  document.getElementById("arrow").classList.toggle("hide");
}

/*SLIDER ENIGMA 1*/
/*Cambio de imágenes + aparición de botón*/
function spotify() {
  document.querySelector(".spotify").src = "images/carrouselmal.jpg";
  document.querySelector(".spotify").style.border = "none";
}

function whatsApp() {
  document.querySelector(".whatsapp").src = "images/carrouselmal.jpg";
  document.querySelector(".whatsapp").style.border = "none";
}

function story() {
  document.querySelector(".story").src = "images/carrouselbien.png";
  document.querySelector(".story").style.border = "none";
  document.querySelector("#slider").classList.add("show");
}

/*MEMORY FINAL BUENO*/
/*Memory*/
let cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

/*Girar cartas*/
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

/*Comprobar si pareja*/
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

/*Desactivar cartas una vez emparejadas*/
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

/*Volver cartas de espalda*/
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 800);
}

/*Reiniciar*/
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

function reload() {
  location.reload();
}

/*QUIZ*/
/*Query selectors e inicios*/
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

/*Push preguntas a availableQuestions*/
function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

/*Configurar número de pregunta, pregunta y opciones*/
function getNewQuestion() {
  /*Configurar texto de preguntas (aleatorio)*/
  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.question;
  /*Conseguir la posición de "questionIndex" desde availableQuestion*/
  const index1 = availableQuestions.indexOf(questionIndex);
  /*Eliminar questionIndex de las availableQuestion para que la pregunta no se repita*/
  availableQuestions.splice(index1, 1);

  /*Configurar opciones (obtener length de las opciones)*/
  const optionLen = currentQuestion.options.length;
  /*Push opciones a availableOptions*/
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }

  optionContainer.innerHTML = "";

  let animationDelay = 0.15;
  /*Crear opciones en HTML*/
  for (let i = 0; i < optionLen; i++) {
    /*Opción aleatoria*/
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    /*Conseguir la posición de optionIndex desde availableOptions*/
    const index2 = availableOptions.indexOf(optionIndex);
    /*Eliminar optionIndex de las availableOptions para que la pregunta no se repita*/
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

/*Obtener el resultado del intento actual*/
function getResult(element) {
  const id = parseInt(element.id);
  /*Obtener la respuesta comparándola con la opción correcta*/
  if (id === currentQuestion.answer) {
    /*Dar color azul a la opción correcta*/
    element.classList.add("correct");
    correctAnswers++;
    console.log("correct" + correctAnswers);
  } else {
    /*Dar color rojo a la opción correcta*/
    element.classList.add("wrong");
  }

  unclickableOptions();
}

/*Hacer que el resto de opciones no se puedan clicar una vez que se ha seleccionado una opción*/
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
  /*Esconder quizBox*/
  quizBox.classList.add("hide");
  /*Mostrar quizBox*/
  resultBox.classList.remove("hide");
  quizResult();
}

/*Configurar pantalla resultado según si todas preguntas correctas o errores*/
function quizResult() {
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

/*Configurar botón según si todas preguntas correctas o errores*/
function btnEnd() {
  if (resultBox.querySelector(".btn").innerHTML === "¡Sigue la historia!") {
    window.location.href = "cap3.html";
  } else {
    tryAgainQuiz();
  }
}

/*Reiniciar quiz*/
function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
}

function tryAgainQuiz() {
  /*Esconder quizBox*/
  resultBox.classList.add("hide");
  /*Mostrar quizBox*/
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}

/*Inicio quiz*/
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

/*CONTRASEÑA ENIGMA 2a*/
/*Indicar contraseña correcta + alertas y redirección*/
function password(event) {
  let input = document.querySelector("#input");
  if (
    input.value === "recapacitar" ||
    input.value === "Recapacitar" ||
    input.value === "RECAPACITAR"
  ) {
    alert("¡Respuesta correcta!");
    event.preventDefault();
    location.replace("cap2b.html");
  } else {
    alert("¡Vuelve a probar! ¡Recapacita!");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", password);
