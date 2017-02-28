var question = {
	"question": "",
	"choices": [
		"",
		"",
		"",
		""
	],
	"answer": ""
};

console.log(question);

$("#button-start").on("click", function() {
	$("#button-start").css("display", "none");
	var seconds = 0;
	var timeLimit = 30;
	var timeRemaining = timeLimit - seconds;
	$("#timer").html(timeRemaining + " seconds remaining")
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