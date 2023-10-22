// timer location in html
var timerEl = document.getElementById("countdown");
// start button location in html
var startButton = document.getElementById("start-button");
// submit button location in html
var answerSubmitButton = document.getElementById("submit-button");
answerSubmitButton.style.visibility = "hidden";
// time left in the timer
var timeLeft = 2;
// index for which question is being displayed
var state = 0;
// the value of the user's number of correct answers divided by the total amount of questions
var score = 0;
// div that wraps the quiz content / used later to append button and input (js line 215/216)
var divContainer = document.getElementById("container");
// div that contains text content for title and final report
var quizIntro = document.getElementById("quiz");
// <p> that contains the quiz introduction and final score and high score
var quizP = document.getElementById("quiz-p");
// <h1> that contains the quiz questions
var questions = document.getElementById("questions");
// <div> that contains the quiz question's choices
var choices = document.getElementById("choices");

// timer function
function countdown() {
  // adds functionality to submit button js (line 172) / on click will run the submitAnswer function
  answerSubmitButton.addEventListener(
    "click",
    () => submitAnswer(timeInterval),
    false
  );
  var timeInterval = setInterval(function () {
    // "--" is ticking the value of timeLeft down by one (unit is being established at the end of the function js.line28)
    timeLeft--;
    // displaying the timeLeft with, "Time:" prefacing it in a textarea in the html's main
    timerEl.textContent = "Time: " + timeLeft;
    // if the timer hits 0 seconds, the timer will dissapear and calculate score
    if (timeLeft <= 0) {
      timerEl.textContent = "Time: ";
      // cancels the timer
      clearInterval(timeInterval);
      removeQuestions();
      scoreCalculator();
      saveScore();
    }
    //how often the setInterval function is being called, which is 1000ms or 1 second (the rate the timer goes down)
  }, 1000);
}

// starts the quiz
function buttonStart() {
  // hides start button on click
  startButton.style.display = "none";
  // runs countdown and loadquestion functions
  countdown();
  loadQuestion();
  // shows submit button on click
  answerSubmitButton.style.visibility = "visible";
  // removes the text from the quiz introductions
  quizIntro.textContent = "";
  quizP.textContent = "";
}

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

// runs on start button / loads the questions and choices
function loadQuestion() {
  // how the questions are being displayed in html
  questions.textContent = myQuestions[state].question;
  // setting the text of choices in html to blank /
  choices.textContent = "";
  // looping through the objects in the answers array
  for (let i = 0; i < myQuestions[state].answers.length; i++) {
    // creating a div, input, and label within html for each choice
    const choicesDiv = document.createElement("div");
    const choice = document.createElement("input");
    const choiceLabel = document.createElement("label");
    choiceLabel.setAttribute("class", "multiple-choice");
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
    // sets the letters to the choices
    choice.name = "answer";
    // appending the corresponding letter to the right choice
    choice.value = i;
    // setting the text content to the choices currently being displayed based on the current question
    choiceLabel.textContent = answers;
    // appending the radio button to the div container for choices
    choicesDiv.appendChild(choice);
    // appending the answer/choices to the div container
    choicesDiv.appendChild(choiceLabel);
    // appending the container for the radio buttons and questions to outer div
    choices.appendChild(choicesDiv);
  }
}

function submitAnswer(timeInterval) {
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
    clearInterval(timeInterval);
    removeQuestions();
    scoreCalculator();
    saveScore();
    return;
  }
}

// function will clear the questions and multiple choices / hide the answer submit button
function removeQuestions() {
  answerSubmitButton.style.display = "none";
  timerEl.textContent = "Time: " + timeLeft;
  questions.textContent = "";
  choices.textContent = "";
  quizIntro.textContent = "All Done";
}

// function will calculate score based on current state divided by max questions and multipled by 100 for percentage
function scoreCalculator() {
  score = (state / myQuestions.length) * 100;
  // will display score on html with string
  quizP.textContent = "Your final score is " + score;
}

// function will create input fields for saving intials and high score
function saveScore() {
  const initialsInput = document.createElement("input");
  const initialsSubmit = document.createElement("button");
  initialsInput.setAttribute("class", "initials");
  initialsSubmit.setAttribute("class", "initials");
  initialsInput.placeholder = "Please input your Initials";
  initialsInput.type = "text";
  divContainer.appendChild(initialsInput);
  divContainer.appendChild(initialsSubmit);
  initialsSubmit.textContent = "Submit";
  // submit button for intials will run the function to store score and intials to local storage / passes the variables (initialsInput, initialsSubmit) from function to allow storeScore to be used in global scope
  initialsSubmit.addEventListener(
    "click",
    () => storeScore(initialsInput, initialsSubmit),
    false
  );
}

// sets and gets the intials and score / displays it with a string
function storeScore(initialsInput, initialsSubmit) {
  // checking if user inputted any data
  if (initialsInput.value === "") {
    alert("Field can't be empty");
    return;
  }
  // getting the value of the user input
  let initialsVal = document.querySelector(".initials").value;
  localStorage.setItem("initials", String(initialsVal));
  localStorage.setItem("score", String(score));
  // hiding the input and submit button on click
  initialsInput.style.display = "none";
  initialsSubmit.style.display = "none";
  // storing the local storage values as variables
  let initials = localStorage.getItem("initials");
  let highScore = parseInt(localStorage.getItem("score"));
  // how the values are being displayed to html
  quizIntro.textContent = "High Scores";
  quizP.textContent = "1." + initials + " - " + highScore;
  // creates a button and div container for the button/ functionality is to reset page to retake quiz
  const goBackDiv = document.createElement("div");
  const goBack = document.createElement("button");
  // set a class for css value of display block
  goBackDiv.setAttribute("id", "reset");
  goBack.textContent = "Go Back";
  divContainer.appendChild(goBackDiv);
  goBackDiv.appendChild(goBack);
  goBack.addEventListener("click", pageReset, false);
}

// function for resetting page
function pageReset() {
  document.location.reload();
}
