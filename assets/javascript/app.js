//when the player presses the start button, game starts
//random question shows
    //-store all questions in a single object? 
        //JSON?
        //each question object also has answer objects, one of which is the correct one
        //object keys are pushed into an array, which is acessed by a random number between 0 and the length of that array
        //object key at that index is removed after it is used. 
//timer ticks down for each question (not the entire game)
    //setInterval 
//user clicks an answer and it tells you if you guessed the right or wrong answer for a set time
    //use data-name to determine which anser to which question was clicked. compare data-name to correct answer property in question object
//moves onto the next question with No user input
    //after user clicks item, answer is shown for a setInteval 
//at the end of the game it displays your correct, incorrect and unanswered answers. No more timers
    //results are stored in a global variable
//when you click the start over button it restarts the game WITHOUT reloading the page. 

var triviaGame = {
    questions : {
        //maybe use "q1", "q2", for properties and have a questionText for each property
        "q1" : {
            questionText: "What was the name of DMX's first album?",
            answers: [
                {
                    text: "The Shores of Hell",
                    correct:false
                },
                {
                    text: "Knee Deep in the Dead",
                    correct:false
                },
                {
                    text: "It's Dark and Hell is Hot",
                    correct:true
                },
                {
                    text: "Inferno",
                    correct:false
                },
            ],
        },

        "q2": {
            questionText: "The best videogame console of all time (this is an indistputable fact)",
            answers: [
                {
                    text: "Super Nintendo",
                    correct:false
                },
                {
                    text: "Sega Genesis",
                    correct:false
                },
                {
                    text: "When I was dead broke I couldn't picture this",
                    correct:false
                },
                {
                    text: "Sony Playstation (PSX)",
                    correct:true
                },
            ],
        },

        "q3": {
            questionText:"you got mail is the catchphrase for what popular 90s technology",
            answers: [
                {
                    text: "AOL",
                    correct:true
                },
                {
                    text: "Myspace",
                    correct:false
                },
                {
                    text: "IM",
                    correct:false
                },
                {
                    text: "Who Cares?",
                    correct:true
                },
            ]
        }
    },

}
//throws the question properties (q1,q2) into an array for selecting

var questionArray = [];
var counter = 0;
var maxQuestions = 3;
var interval = 2000;
var correctGuesses;
var wrongGuesses;
var lateGuesses;

function initializeGame(){
    questionArray = Object.keys(triviaGame.questions);
    counter = 0;
}

//TODO: get game to display questions in HTML before working on the timer part;
function displayQuestion(question){
    $("#question").empty();
    $("#question").append("<p>" + question + "</p>");
};

//the basic question generation mechanism
function startGame() {

        //selects a random number between 0 and the question array length
 
        //puts that random number in the question array, refers to that property of the questions object to access text

        //removes that question from the array so it can't be selected again


            
            if(counter >= maxQuestions){
                setTimeout(function() {
                    console.log("nope");
                    }, 2000)
            } else {
            var questionCounter = Math.floor(Math.random() * (questionArray.length));
            var selection = triviaGame.questions[questionArray[questionCounter]].questionText;
            console.log(selection);
            console.log(questionCounter);
            console.log(questionArray);
            displayQuestion(selection);
            questionArray.splice(questionCounter, 1); 
                if(counter <= maxQuestions) {
                    counter++;
                    setTimeout(startGame, interval);

                } 

            }    

     //displays question after a certain time



}
