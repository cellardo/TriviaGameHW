var question1 = {
	"question": "What is the name of Alex Jones' radio show?",
	"choices": [
		"Infosec",
		"Infowars",
		"Breitbart",
		"Infochammel"
	],
	"answer": "Infowars"
};

var question2 = {
	"question": "Which of these have been proven to be a hoax?",
	"choices": [
		"Project MKUltra",
		"Mothman",
		"Fluoride",
		"Fiji Mermaid"
	],
	"answer": "Mothman"
};

var question3 = {
	"question": "Which of these did JFK warn us about in a speech?",
	"choices": [
		"Military-Industrial Complex",
		"Secret Societies",
		"Bad Relations with Cuba",
		"The Mafia"
	],
	"answer": "Secret Societies"
};

var question4 = {
	"question": "What did Neo ingest that caused his crazy trip?",
	"choices": [
		"Red Pill",
		"LSD",
		"Blue Pill",
		"Nyquil"
	],
	"answer": "Red Pill"
};

var question5 = {
	"question": "Is the government spying on you?",
	"choices": [
		"Probably Not",
		"Absolutely Not",
		"Likely",
		"Definitely"
	],
	"answer": "Definitely"
};

var question6 = {
	"question": "To which country did Hitler escape before faking his death?",
	"choices": [
		"Argentina",
		"Bolivia",
		"Switzerland",
		"Ukraine"
	],
	"answer": "Argentina"
};

var question7 = {
	"question": "Which country has the most UFO sightings?",
	"choices": [
		"Britain",
		"France",
		"United States",
		"Ecuador"
	],
	"answer": "United States"
};

var question8 = {
	"question": "Which of the following belief systems asserts that human beings are kept in ignorance of their true Divine heritage by a false deity known as the Demiurge?",
	"choices": [
		"Sufism",
		"Freemasonry",
		"Scientology",
		"Gnosticism"
	],
	"answer": "Gnosticism"
};

var question9 = {
	"question": "Which of these families has less than a trillion dollars in net worth (adjusted for today)?",
	"choices": [
		"Rothschild",
		"Rockefeller",
		"Koch",
		"Medici"
	],
	"answer": "Koch"
};

var question10 = {
	"question": "Which of the following organizations were monitoring Martin Luther King, Jr.?",
	"choices": [
		"NSA",
		"CIA and FBI",
		"FBI and NSA",
		"NSA, CIA, and FBI"
	],
	"answer": "FBI and NSA"
};

var game = {
	"questions": [
		question1, question2, question3, question4, question5, question6, question7, question8, question9, question10
	],
	"correctCount": 0,
	"incorrectCount": 0,
	"unansweredCount": 0
}

var questionsRemaining = game["questions"].slice();

var timer;

var resetTimer = function() {
	var timeRemaining = 30;
	$("#timer").text(timeRemaining + " seconds remaining");
	timer = setInterval(function() {
		timeRemaining--;
		if(timeRemaining !== 1) {
			$("#timer").text(timeRemaining + " seconds remaining");
		} else {
			$("#timer").text(timeRemaining + " second remaining");
		}
		if(timeRemaining === 0) {
			var correctAnswerElement = $("<div>").text("The correct answer is: " + $(".choice").attr("answer"));
			clearQuestion();
			clearInterval(timer);
			var messageElement = $("<div>").text("Out of Time!");
			$(".question-container").append(messageElement);
			
			$(".question-container").append(correctAnswerElement);
			game["unansweredCount"]++;
			delayNextQuestion();
		}
	} , 1000);
}

var displayQuestion = function() {
	if(questionsRemaining.length > 0) {
		var question = questionsRemaining[0]["question"];
		var choices = questionsRemaining[0]["choices"];
		var answer = questionsRemaining[0]["answer"];

		var questionElement = $("<div>").text(question);
		$(".question-container").append(questionElement);
		for(var i = 0; i < choices.length; i++) {
			var choiceElement = $("<div>").text(choices[i]);
			choiceElement.addClass("choice");
			choiceElement.attr("answer", answer);
			$(".question-container").append(choiceElement);
		}
		// remove the question that was just asked from the questions array
		questionsRemaining.shift();
	} else {
		var messageElement = $("<div>").text("All done, here's how you did!");
		$(".question-container").append(messageElement);
		var correctAnswerElement = $("<div>").text("Correct Answers: " + game["correctCount"]);
		$(".question-container").append(correctAnswerElement);
		var incorrectAnswerElement = $("<div>").text("Incorrect Answers: " + game["incorrectCount"]);
		$(".question-container").append(incorrectAnswerElement);
		var unansweredElement = $("<div>").text("Unanswered: " + game["unansweredCount"]);
		$(".question-container").append(unansweredElement);
		spawnRestartButton();
	}
}

var clearQuestion = function() {
	$(".question-container").empty();
}

var delayNextQuestion = function() {
	setTimeout(function() {
		clearQuestion();
		if(questionsRemaining.length > 0) {
			resetTimer();
		}
		displayQuestion();
	}, 3000);
}

var spawnRestartButton = function() {
	var button = $("<button>").text("Restart");
	button.attr("id", "button-restart");
	$(".question-container").append(button);
}

$(document).on("click", ".choice", function() {
	if($(this).text() === $(this).attr("answer")) {
		clearQuestion();
		clearInterval(timer);
		var messageElement = $("<div>").text("Correct!");
		$(".question-container").append(messageElement);
		game["correctCount"]++;
		delayNextQuestion();
	} else {
		var correctAnswerElement = $("<div>").text("The correct answer is: " + $(this).attr("answer"));
		clearQuestion();
		clearInterval(timer);
		var messageElement = $("<div>").text("Nope!");
		$(".question-container").append(messageElement);
		$(".question-container").append(correctAnswerElement);
		game["incorrectCount"]++;
		delayNextQuestion();
	}
});

$(document).on("click", "#button-start", function() {
	$("#button-start").css("display", "none");
	resetTimer();
	displayQuestion();
});

$(document).on("click", "#button-restart", function() {
	$(".question-container").empty();
	questionsRemaining = game["questions"].slice();
	game["correctCount"] = 0;
	game["incorrectCount"] = 0;
	game["unansweredCount"] = 0;
	resetTimer();
	displayQuestion();
});