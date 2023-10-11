// timer location in html
var timerEl = document.getElementById("countdown");
// start button location in html
var startButton = document.getElementById("start-button");
// submit button location in html
var submitButton = document.getElementById("submit-button");
// time left in the timer
var timeLeft = 20;
// index for which question is being displayed
var state = 0;
// the value of the user's number of correct answers divided by the total amount of questions
var score = 0;
submitButton.style.visibility = "hidden";

// timer function start
function countdown() {
  var timeInterval = setInterval(function () {
    // "--" is ticking the value of timeLeft down by one (unit is being established at the end of the function js.line28)
    timeLeft--;
    // displaying the timeLeft with, "Time:" prefacing it in a textarea in the html's main
    timerEl.textContent = "Time : " + timeLeft;
    // if the timer hits 0 seconds, the timer will dissapear and calculate score
    if (timeLeft <= 0) {
      let score = (state / myQuestions.length) * 100;
      // displaying the score as an alert
      // document.body.innerHTML = "";
      alert("You scored a " + score);
      saveScore();
      // cancels the timer
      clearInterval(timeInterval);
    }
    //how often the setInterval function is being called, which is 1000ms or 1 second (the rate the timer goes down)
  }, 1000);
}
// timer function end

// variables that store the text for the quiz introductions
var quizIntro = document.getElementById("quiz");
var quizP = document.getElementById("quiz-p");
quizIntro.textContent = "Coding Quiz Challenge";
quizP.textContent =
  "Try to answer the following javascript-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by 10 seconds";

// start button function
function buttonStart() {
  // hides start button on click
  startButton.style.visibility = "hidden";
  // runs countdown and loadquestion functions
  countdown();
  loadQuestion();
  // shows submit button on click
  submitButton.style.visibility = "visible";
  // removes the text from the quiz introductions
  quizIntro.remove();
  quizP.remove();
}
// start button function end

// nested objects myQuestions[{question,answers[{a,boolean},{b,boolean},{c,boolean},{d,boolean}]}]
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
      { ans: "function:myFunction()", isCorrect: false },
      { ans: "function=myFunction()", isCorrect: false },
      { ans: "function myFunction()", isCorrect: true },
      { ans: "myFunction():function", isCorrect: false },
    ],
  },
  {
    question: "4. How do you call a function named 'myFunction'?",
    answers: [
      { ans: "call myFunction()", isCorrect: false },
      { ans: "myFunction()", isCorrect: true },
      { ans: "call function myFunction", isCorrect: false },
      { ans: "Call.myFunction()", isCorrect: false },
    ],
  },
  {
    question: "5. How does a 'for' loop start?",
    answers: [
      { ans: "for (i = 0; i <= 5)", isCorrect: false },
      { ans: "for (i = 0; i <= 5; i++)", isCorrect: true },
      { ans: "for i = 1 to 5", isCorrect: false },
      { ans: "for (i <= 5; i++)", isCorrect: false },
    ],
  },
];

// load questions function start
function loadQuestion() {
  // where the questions and choices are being displayed in html
  var questions = document.getElementById("questions");
  var choices = document.getElementById("choices");
  // how the questions are being displayed in html
  questions.textContent = myQuestions[state].question;
  // setting the text of choices in html to blank /
  choices.textContent = "";
  // looping through the objects in the answers array
  for (let i = 0; i < myQuestions[state].answers.length; i++) {
    // creating a div, input, and label within html
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
    // answers being displayed correlate to the question state
    answers += myQuestions[state].answers[i].ans;
    // sets the choices to a type of radio inpt
    choice.type = "radio";
    //
    choice.name = "answer";
    choice.value = i;
    // displaying the answers in html
    choiceLabel.textContent = answers;

    choicesdiv.appendChild(choice);
    choicesdiv.appendChild(choiceLabel);
    choices.appendChild(choicesdiv);
  }
}
// load question function end

// adds functionality to submit button / on click will run the submitAnswer function
submitButton.addEventListener("click", submitAnswer, false);

// submit answer function start
function submitAnswer() {
  // checks the value of the user input in html
  let checkedValue = document.querySelector(
    'input[name="answer"]:checked'
  ).value;
  // sets a variable to easily access the boolean key value pairs associated with the choices
  var isCorrect = myQuestions[state].answers[checkedValue].isCorrect;
  // checking if user input's choice has the corresponding key value pair of isCorrect
  if (isCorrect) {
    // if they do, then state increases and next question is loaded
    state++;
    // if the state of the question increases past the length(amount) of the myQuestions array
    if (state !== myQuestions.length) loadQuestion();
    // if they answer wrong, the timeLeft is decreased by 10seconds
  } else timeLeft -= 10;
  timerEl.textContent = "Timer : " + timeLeft;

  // if the state reaches the end of the array
  if (state == myQuestions.length) {
    // score will be calculated based on the current state divided by total questions. (multplied by 100 to display as percentage)
    let score = (state / myQuestions.length) * 100;
    // displays the score as an alert box
    // document.body.innerHTML = "";
    alert("You scored a " + score);
    saveScore()
  }
  // save score function will run
  // saveScore()
}

// save score function start
function saveScore() {
  var savedInitial = document.createElement("h2")
  var savedScore = document.createElement("h3")
  body.appendChild(savedInitial)
  body.appendChild(savedScore)

  savedInitial.textContent = "Please save your initials here: "
  savedScore.textContent = "Your new high score is: " + score
}
