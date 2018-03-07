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
    //object global variables`
    //array that holds questions, questions are removed from array as they are displayed
    questionArray : [],
    //counter that keeps track of how many questions have been answered
    counter : 0,
    maxQuestions : 10,
    interval : 2000,
    intervalLong : 3000,
    correctGuesses : 0,
    wrongGuesses : 0,
    lateGuesses : 0,
    //variable that holds the current question object 
    currentQuestion : undefined,
    //question property
    questions : {
        "q1" : {
            questionText: "Which of these is NOT a chapter in the first DOOM game?",
            correctAnswer: "It's Dark and Hell is Hot",
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
            questionText: "The Sony Playstation was originally developed as a CD drive addon for which console?",
            correctAnswer: "Super Nintendo",
            answers: [
                {
                    text: "Super Nintendo",
                    correct:true,
                },
                {
                    text: "Sega Genesis",
                    correct:false,
                },
                {
                    text: "When I was dead broke I couldn't picture this",
                    correct:false,
                },
                {
                    text: "Neo Geo",
                    correct:false,
                },
            ],
        },

        "q3": {
            questionText:"Which of the following platforms does NOT have a Final Fantasy game?",
            correctAnswer: "Nintendo 64",
            answers: [
                {
                    text: "Xbox 360",
                    correct:false
                },
                {
                    text: "PC",
                    correct:false
                },
                {
                    text: "Nintendo 64",
                    correct:true
                },
                {
                    text: "Super Nintendo",
                    correct:false
                },


            ]
        },
        "q4": {
            questionText:"This FPS game, released in 1996, features a fowl mouthed, tank top wearing anti-hero.  It also suffered an awful reboot in 2011",
            correctAnswer: "Duke Nukem 3D",
            answers: [
                {
                    text: "Duke Ellington 3D",
                    correct:false
                },
                {
                    text: "Buck Smack'em 3D",
                    correct:false
                },
                {
                    text: "Duke Nukem 3D",
                    correct:true
                },
                {
                    text: "Dave Mustaine 3D",
                    correct:false
                },
            ]
        },
        "q5": {
            questionText:"Which multiplayer game featured the announcer who shouted: 'First Blood', 'Double Kill!', 'M-M-M-MONSTER KILL'",
            correctAnswer: "Unreal Tournament",
            answers: [
                {
                    text: "Mortal Kombat",
                    correct:false
                },
                {
                    text: "Unreal Tournament",
                    correct:true
                },
                {
                    text: "Quake III",
                    correct:false
                },
                {
                    text: "Half Life: Deathmatch",
                    correct:false
                },
            ]
        },
        "q6": {
            questionText:"Which of the following platforms did NOT have a version of DOOM on them?",
            correctAnswer: "Sega Dreamcast",
            answers: [
                {
                    text: "Nintendo 64",
                    correct:false
                },
                {
                    text: "Xbox 360",
                    correct:false
                },
                {
                    text: "Gameboy Advance",
                    correct:false
                },
                {
                    text: "Sega Dreamcast",
                    correct:true
                },
            ]
        },
        "q7": {
            questionText:"The following item is the first weapon in the iconic 1997 game, Half Life?",
            correctAnswer: "Crowbar",
            answers: [
                {
                    text: "Crowbar",
                    correct:true
                },
                {
                    text: "Baseball Bat",
                    correct:false
                },
                {
                    text: "Pistol",
                    correct:true
                },
                {
                    text: "Chainsaw",
                    correct:false
                },
            ]
        },
        "q8": {
            questionText:"___________ does what Nintendon't",
            correctAnswer: "Genesis",
            answers: [
                {
                    text: "Playstation",
                    correct:false
                },
                {
                    text: "Genesis",
                    correct:true
                },
                {
                    text: "TurboGrafx 16",
                    correct:false
                },
                {
                    text: "Xbox",
                    correct:false
                },
            ]
        },

        "q9": {
            questionText:"The following was the first game to recieve an M rating",
            correctAnswer: "Mortal Kombat",
            answers: [
                {
                    text: "DOOM",
                    correct:false
                },
                {
                    text: "Mortal Kombat",
                    correct:true
                },
                {
                    text: "Wolfenstein 3D",
                    correct:false
                },
                {
                    text: "Duke Nukem 3D",
                    correct:false
                },
            ]
        },
    
        "q10": {
            questionText:"This game, developed by From Software in 1994, is considered a precursor to the Dark Souls franchise",
            correctAnswer: "King's Field",
            answers: [
                {
                    text: "Diablo",
                    correct:false
                },
                {
                    text: "Dungeon Hack",
                    correct:false
                },
                {
                    text: "King's Quest",
                    correct:false
                },
                {
                    text: "King's Field",
                    correct:true
                },
            ]
        },

    },
    
    //resets global variables, hides gameboard, shows ending text
    initialize : function() {

       triviaGame.questionArray = Object.keys(triviaGame.questions);
       triviaGame.counter = 0;
       triviaGame.timer.reset;
       triviaGame.correctGuesses = 0,
       triviaGame.wrongGuesses = 0,
       triviaGame.lateGuesses = 0,
       $("#game-board div").show();
       $("#game-board p").show();
       $(".end-text").hide();
    },


    //displays the end screen with the score, and the reset button 
    endScreen: function (){
        $("#game-board div").hide();
        $("#game-board p").hide();
        $(".end-text").show();
        $("#resetgame").show();
        $("#correct").html("<p>Correct Guesses: " + triviaGame.correctGuesses + "</p>");
        $("#incorrect").html("<p>Wrong Guesses: " + triviaGame.wrongGuesses + "</p>");
        $("#timesup").append("<p>Times Up: " + triviaGame.lateGuesses + "</p>");
    },

    //main gameloop. Determines how many questions have been answered and decides which methods to run
    startGame: function() {

        //first checks if the counter has reached the max amount of questions
        if(triviaGame.counter < triviaGame.maxQuestions){
            triviaGame.displayQuestion();
            triviaGame.counter++;
            //setTimeout(triviaGame.startGame, triviaGame.interval);

        } else {
            triviaGame.endScreen();
        }    

    },

    //the meat of the game.  Runs every time a new question needs to be displayed, holds click methods for answers and correct and incorrect answers
    displayQuestion: function (){
        //starts the timer
        triviaGame.timer.start();
        //creates a random number to select a question from the array
        var questionCounter = Math.floor(Math.random() * (triviaGame.questionArray.length));
        //plugs that random number into the questions property object
        triviaGame.currentQuestion = triviaGame.questions[triviaGame.questionArray[questionCounter]];
        //removes item at the index from the question array
        triviaGame.questionArray.splice(questionCounter, 1); 
        $("#question").empty();
        $("#answers").empty();
        //appends the text of the question to the div 
        $("#question").append("<p>" + triviaGame.currentQuestion.questionText + "</p>");
        //for loop that cycles through the answers and displays them on the page 
        for(i = 0; i < triviaGame.currentQuestion.answers.length; i++){
            $("#answers").append("<button class = 'option' data-number = " + i + "> " + triviaGame.currentQuestion.answers[i].text + "</button>");
        }
        //determines what to do when the user clicks on an answer
        $(".option").on("click", function(){
            var answerRef = $(this).data("number");
            var result = ""
            if(triviaGame.currentQuestion.answers[answerRef].correct){
                result = "Correct!";
                triviaGame.correctGuesses++;
            //takes the data number in the clickable html element and runs it through the answers array, then checks the boolean in each answer to see if it's the correct answer
            //this approach allows multiple correct answers
            } else if(triviaGame.currentQuestion.answers[answerRef].correct == false) {
                result = "Wrong! The Correct Answer is: </br> " + triviaGame.currentQuestion.correctAnswer;
                triviaGame.wrongGuesses++;
            } 
            //resets the timer 
            triviaGame.timer.reset();
            $("#answers").html("<p>" + result +"</p>")
            //runs startGame again after a certain amount of time
            setTimeout(triviaGame.startGame, triviaGame.interval);


        });
    },

    //timer property
    timer : {
        countdown : 20,
        timeup: false,
        start : function() {
            countdownID = setInterval(function(){
                $("#timer").text(triviaGame.timer.countdown);
                triviaGame.timer.countdown --; 
                //if the timer runs out it displays "time out", I would have preferred to store this in the "displayQuestion property"
                //but it needs to run a check every second, and I didn't want to create two timers, so I put it here. 
                if(triviaGame.timer.countdown <= 0){
                    clearInterval(countdownID);
                    triviaGame.timer.reset();
                    $("#answers").html("<p>Time's Up!  The Correct Answer is: </br> " + triviaGame.currentQuestion.correctAnswer)
                    triviaGame.lateGuesses++;
                    setTimeout(triviaGame.startGame, triviaGame.interval);
        
                };
   

            }, 1000);

        },
        
        //resets the timer
        reset: function() {
            clearInterval(countdownID);
            triviaGame.timer.countdown = 20;
            $("#timer").empty();
            triviaGame.timer.timeup = false;
        }
        

        
    }    
    


}





//FUNCTION AND METHOD CALLS
$(document).ready(function() {              
    //hides reset button and displays start button at start of the game
    $("#resetgame").hide();
    //when the start button is clicked the intro screen is hiden and the initialize and startGame functions are run
    $("#start-button").on("click", function(){
        $("#intro-screen").hide();
        triviaGame.initialize();
        triviaGame.startGame();
    })
    
    //the reset button. When clicked it hides the previous game info, shows the intro image (but not the start button) for a set period of time
    //then runs the initialize and startGame methods. 
    $("#resetgame").on("click", function(){
        $("#resetgame").hide();
        $("#intro-screen").show();
        $("#intro-image").show();
        $("#start-button").hide();
        $(".end-text").hide();

        setTimeout(function(){
            $("#intro-image").hide();
            triviaGame.initialize();
            triviaGame.startGame();
        }, triviaGame.intervalLong);

    })



});
