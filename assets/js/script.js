// timer function start
var timerEl = document.getElementById("countdown");
var startButton = document.getElementById("start-button");
var submitButton = document.getElementById("submit-button");
var timeLeft = 20;
var state = 0;
var score = 0;

function countdown() {
  var timeInterval = setInterval(function () {
    // "--" is ticking the timeLeft variable of 5 down by a second at a time
    timeLeft--;
    // displaying the timeLeft with, "seconds left in a textarea in the html's main
    timerEl.textContent = "Time : " + timeLeft;
    // if the timer hits 0 seconds, the timer will dissapear and run the displayMessage function.
    if (timeLeft == 0) {
      let score = state / (myQuestions.length) * 100
      alert("You scored a " + score)
      saveScore()
      clearInterval(timeInterval);
    }
    //how often the setInterval function is being called, which is 1000ms or 1s (the rate the timer goes down)
  }, 1000);
}
// timer function end
// nested objects myQuestions[{question,answers[
// {a,boolean},{b,boolean},{c,boolean},{d,boolean}]}]

function buttonStart() {
  startButton.style.visibility = "hidden";
  countdown();
  loadQuestion();
}

var myQuestions = [
  {
    question: "1.Inside which HTML element do we put the JavaScript?",
    answers: [
      { ans: "<javascript>", isCorrect: false },
      { ans: "<js>", isCorrect: false },
      { ans: "<script>", isCorrect: true },
      { ans: "<scripting>", isCorrect: false },
    ],
  },
  {
    question: "2. Where is the correct place to insert a JavaScript?",
    answers: [
      {
        ans: "Both the <head> section and the <body> section are correct",
        isCorrect: true,
      },
      { ans: "The <body> section", isCorrect: false },
      { ans: "The <head> section", isCorrect: false },
      { ans: "The <footer> section", isCorrect: false },
    ],
  },
  {
    question: "3. How do you create a function?",
    answers: [
      { ans: "function:myFunction()", isCorrect: false},
      { ans: "function=myFunction()", isCorrect: false },
      { ans: "function myFunction()", isCorrect: true },
      { ans: "myFunction():function", isCorrect: false },
    ],
  },
  {
    question: "4. How do you call a function named 'myFunction'?",
    answers: [
      { ans: "call myFunction()", isCorrect: false},
      { ans: "myFunction()", isCorrect: true},
      { ans: "call function myFunction", isCorrect: false },
      { ans: "Call.myFunction()", isCorrect: false },
    ],
  },
  {
    question: "5. How does a 'for' loop start?",
    answers: [
      { ans: "for (i = 0; i <= 5)", isCorrect: false},
      { ans: "for (i = 0; i <= 5; i++)", isCorrect: true},
      { ans: "for i = 1 to 5", isCorrect: false},
      { ans: "for (i <= 5; i++)", isCorrect: false },
    ],
  },
];


function loadQuestion() {
  var questions = document.getElementById("questions");
  var choices = document.getElementById("choices");

  questions.textContent = myQuestions[state].question;
  choices.innerHTML = "";
  console.log(myQuestions[state]);
  for (let i = 0; i < myQuestions[state].answers.length; i++) {
    const choicesdiv = document.createElement("div");
    const choice = document.createElement("input");
    const choiceLabel = document.createElement("label");
    let answers = "";
    // appending "a,b,c,d" to the start of the choices
    switch (i) {
      case 0:
        answers += "a: ";
        break;
      case 1:
        answers += "b: ";
        break;
      case 2:
        answers += "c: ";
        break;
      case 3:
        answers += "d: ";
        break;
      default:
        break;
    }
    answers += myQuestions[state].answers[i].ans;
    choice.type = "radio";
    choice.name = "answer";
    choice.value = i;

    choiceLabel.textContent = answers;

    choicesdiv.appendChild(choice);
    choicesdiv.appendChild(choiceLabel);
    choices.appendChild(choicesdiv);
  }
}

submitButton.addEventListener("click", submitAnswer, false);

function submitAnswer() {
  let checkedValue = document.querySelector(
    'input[name="answer"]:checked'
  ).value;
  var isCorrect = myQuestions[state].answers[checkedValue].isCorrect;
  console.log(checkedValue);
  console.log(isCorrect);
  if (isCorrect) {
    state++;
  if (state !== (myQuestions.length))
    loadQuestion();
  } else timeLeft -= 10;
  timerEl.textContent = "Timer : " + timeLeft + " seconds left.";

  if (state == (myQuestions.length)){
    let score = state / (myQuestions.length) * 100
    alert("You scored a " + score)
  }
  saveScore()
}

function saveScore () {
  let savedName = document.createElement("input")
  let savedScore = document.createElement("h1")

  savedScore = "Congratulations your score is " + score
  savedName = "Enter your name here: "
  
  }