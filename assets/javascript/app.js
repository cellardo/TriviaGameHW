var question = {
	"question": "Sample Question",
	"choices": [
		"A",
		"B",
		"C",
		"D"
	],
	"answer": "A"
};

console.log(question);

// render question
var questionElement = $("<div>").text(question["question"]);
$(".container").append(questionElement);

// render choices
for(var i = 0; i < question["choices"].length; i++) {
	var choiceElement = $("<div>").text(question["choices"][i]);
	$(".container").append(choiceElement);
	choiceElement.addClass("choice");
	// if(question["choices"][i] === question["answer"]) {
	// 	choiceElement.addClass("answer");	
	// }
	choiceElement.attr("id", question["answer"]);
}

// listens for choice selection
$(".choice").on("click", function() {
	console.log($(this).text());
	if($(this).text() === $(this).attr("id")) {
		// RIGHT ANSWER
		var messageElement = $("<div>").text("Correct!");
		$(".container").append(messageElement);
	} else {
		// WRONG ANSWER
		var messageElement = $("<div>").text("Nope!");
		$(".container").append(messageElement);
		var correctAnswerElement = $("<div>").text("The Correct Answer was: " + $(this).attr("id"));
		$(".container").append(correctAnswerElement);
	}
});

$("#button-start").on("click", function() {
	$("#button-start").css("display", "none");
	var seconds = 0;
	var timeLimit = 30;
	var timeRemaining = timeLimit - seconds;
	$("#timer").html(timeRemaining + " seconds remaining");
	console.log(timeRemaining);
	var timer = setInterval(function() {
		seconds++;
		timeRemaining = timeLimit - seconds;
		if(timeRemaining !== 1) {
			$("#timer").html((timeLimit - seconds) + " seconds remaining");
		} else {
			$("#timer").html((timeLimit - seconds) + " second remaining");
		}
		console.log(timeRemaining);
		if(timeRemaining === 0) {
			clearInterval(timer);
		}
	}, 1000);
});