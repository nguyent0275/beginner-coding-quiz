// timer function start
var timerEl = document.getElementById("countdown");
var questions = document.getElementById("questions")
var choiceA = document.getElementById("a")
var choiceB = document.getElementById("b")
var choiceC = document.getElementById("c")
var choiceD = document.getElementById("d")
var startButton = document.getElementById("start-button")
var state = 0

function countdown() {
  var timeLeft = 100;

  var timeInterval = setInterval(function () {
    // "--" is ticking the timeLeft variable of 5 down by a second at a time
    timeLeft--;
    // displaying the timeLeft with, "seconds left in a textarea in the html's main
    timerEl.textContent = timeLeft + " seconds left.";
    // if the timer hits 0 seconds, the timer will dissapear and run the displayMessage function.
    if (timeLeft === 0) {
      clearInterval(timeInterval);
    }
    //how often the setInterval function is being called, which is 1000ms or 1s (the rate the timer goes down)
  }, 1000);
}
// timer function end
function buttonStart(){
    startButton.style.visibility = "hidden"
    countdown();
    questions.textContent = "1.Inside which HTML element do we put the JavaScript?"
    choiceA.textContent = "<javascript>"
    choiceB.textContent = "<js>"
    choiceC.textContent = "<script>"
    choiceD.textContent = "<scripting>"

}

function buttonPress(val) {
    if (state == 0){
        if (val == "<script>"){
            state == 1
        } else {
            timerEl.textContent = parseInt(timerEl) - 10
        }
    }

}
let quizQuestions = [["1.Inside which HTML element do we put the JavaScript?","<javascript>", "<js>", "<script>", "<scripting>"]];

myQuestionsString = JSON.stringify(quizQuestions)
console.log(typeof(myQuestionsString))


// questions.textContent = quizQuestions
// console.log(typeof(quizQuestions))









var myQuestions = [
  {
    question: "1.Inside which HTML element do we put the JavaScript?",
    choices: {
      a: "<javascript>",
      b: "<js>",
      c: "<script>",
      d: "<scripting>",
    },
    answer: "c",
  },
  {
    question: "2. Where is the correct place to insert a JavaScript?",
    choices: {
      a: "Both the <head> section and the <body> section are correct",
      b: "The <body> section",
      c: "The <head> section",
      d: "The <footer> section",
    },
    answer: "a",
  },
  {
    question: "3. An external JavaScript must contain the <script> tag",
    choices: {
      a: "true",
      b: "false",
    },
    answer: "a",
  },
  {
    question: "4. How do you create a function?",
    choices: {
      a: "function:myFunction()",
      b: "function=myFunction()",
      c: "function myFunction()",
      d: "myFunction():function",
    },
    answer: "c",
  },
  {
    question: "5. How do you call a function named 'myFunction'?",
    choices: {
      a: "call myFunction()",
      b: "myFunction()",
      c: "call function myFunction",
      d: "Call.myFunction()",
    },
    answer: "b",
  },
  {
    question: "6. How does a 'for' loop start?",
    choices: {
      a: "for (i = 0; i <= 5)",
      b: "for (i = 0; i <= 5; i++)",
      c: "for i = 1 to 5",
      d: "for (i <= 5; i++)",
    },
    answer: "b",
  },
];

// questions.textContent = myQuestionsString