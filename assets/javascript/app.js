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
    //object global variables
    questionArray : [],
    counter : 0,
    maxQuestions : 3,
    interval : 10000,
    correctGuesses : 0,
    wrongGuesses : 0,
    lateGuesses : 0,
    currentQuestion : undefined,
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

    displayQuestion: function (){
        triviaGame.timer.start();
        //creates a random number to select a question from the array
        var questionCounter = Math.floor(Math.random() * (triviaGame.questionArray.length));
        //plugs that random number into the questions property object
        triviaGame.currentQuestion = triviaGame.questions[triviaGame.questionArray[questionCounter]];
        //removes item at the index from the question array
        triviaGame.questionArray.splice(questionCounter, 1); 
        //LOGS: REMOVE
        //console.log("current question: " + triviaGame.currentQuestion);
        //console.log("question counter " + triviaGame.questionCounter);
        //console.log("question array " + triviaGame.questionArray);
        //empties the relevant DOM area
        $("#question").empty();
        $("#answers").empty();

        //appends the text of the question to the div 
        $("#question").append("<p>" + triviaGame.currentQuestion.questionText + "</p>");
        //for loop that cycles through the answers and displays them on the page 
        for(i = 0; i < triviaGame.currentQuestion.answers.length; i++){
            $("#answers").append("<button class = 'option' data-number = " + i + "> " + triviaGame.currentQuestion.answers[i].text + "</button>");
        }

        $(".option").on("click", function(){
            var answerRef = $(this).data("number");
            var result = ""
            //REMOVE THESE//
            if(triviaGame.currentQuestion.answers[answerRef].correct){
                result = "Correct!";
                triviaGame.correctGuesses++;
            } else if(triviaGame.currentQuestion.answers[answerRef].correct == false) {
                result = "Wrong!"
                triviaGame.wrongGuesses++;
            } 

            triviaGame.timer.reset();
            $("#answers").html("<p>" + result +"</p>")
            setTimeout(triviaGame.startGame, 2000);

            //REMOVE THESE//
        });
    },

    endScreen: function (){
        $("#game-board div").hide();
        $("#game-board p").hide();
        $(".end-text").show();
        $("#correct").html("<p>Correct Guesses: " + triviaGame.correctGuesses + "</p>");
        $("#incorrect").html("<p>Wrong Guesses: " + triviaGame.wrongGuesses + "</p>");
        $("#timesup").append("<p>Times Up: " + triviaGame.lateGuesses + "</p>");
    },

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
    

    timer : {
        countdown : 20,
        timeup: false,
        start : function() {
            countdownID = setInterval(function(){
                $("#timer").text(triviaGame.timer.countdown);
                triviaGame.timer.countdown --; 
                if(triviaGame.timer.countdown <= 0){
                    clearInterval(countdownID);
                    triviaGame.timer.reset();
                    $("#answers").html("<p>Time's Up</p>")
                    triviaGame.lateGuesses++;
                    setTimeout(triviaGame.startGame, 4000);
        
                };
   

            }, 1000);

        },
        
        reset: function() {
            clearInterval(countdownID);
            triviaGame.timer.countdown = 20;
            $("#timer").empty();
            triviaGame.timer.timeup = false;
        }
        

        
    }    
    


}





//the basic question generation mechanism


$("#startgame").on("click", function(){
    triviaGame.initialize();
    triviaGame.startGame();
})