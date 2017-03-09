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
		"FEMA Camps",
		"Fluoride",
		"Fiji Mermaid"
	],
	"answer": "Fiji Mermaid"
};

var question3 = {
	"question": "What did JFK warn us about in a 1961 speech?",
	"choices": [
		"Military-Industrial Complex",
		"Secret Societies",
		"CIA",
		"The Mafia"
	],
	"answer": "Secret Societies"
};

var question4 = {
	"question": "In The Matrix, what did Neo take that allowed him to see things as they really were?",
	"choices": [
		"Red Pill",
		"Purple Pill",
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
	"question": "Where did Hitler escape to after faking his death?",
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
		"Russia",
		"Norway",
		"United States",
		"Ecuador"
	],
	"answer": "United States"
};

var question8 = {
	"question": "Which of the following belief systems asserts that this material world was created by a lesser deity known as the Demiurge?",
	"choices": [
		"Sufism",
		"Freemasonry",
		"Scientology",
		"Gnosticism"
	],
	"answer": "Gnosticism"
};

var question9 = {
	"question": "Which of these families has the highest net worth (adjusted for today)?",
	"choices": [
		"Rothschild",
		"Rockefeller",
		"Koch",
		"Medici"
	],
	"answer": "Rothschild"
};

var question10 = {
	"question": "Which of the following organizations were wiretapping Martin Luther King, Jr.?",
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

$("#song")[0].play();
$("#song")[0].loop = true;

var resetTimer = function() {
	var timeRemaining = 30;
	$("#timer").text(timeRemaining);
	timer = setInterval(function() {
		timeRemaining--;
		if(timeRemaining !== 1) {
			$("#timer").text(timeRemaining);
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
		questionElement.addClass("question");
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
		var messageElement = $("<div>").text("We're done here! This never happened.");
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
	}, 4000);
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
		var messageElement = $("<div>").text("Correct, but now they know you know...");
		$(".question-container").append(messageElement);
		game["correctCount"]++;
		delayNextQuestion();
	} else {
		var correctAnswerElement = $("<div>").text("The correct answer is: " + $(this).attr("answer"));
		clearQuestion();
		clearInterval(timer);
		var messageElement = $("<div>").text("You've been lied to!");
		$(".question-container").append(messageElement);
		$(".question-container").append(correctAnswerElement);
		game["incorrectCount"]++;
		delayNextQuestion();
	}
});

$(document).on("click", "#button-start", function() {
	$("#button-start").css("display", "none");
	$("#crest").css("display", "none");
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