# TriviaGameHW
Advanced Version

## Live Link
 - https://yoonslee.github.io/TriviaGameHW/

## Requirements
- Create a trivia game that shows one question at a time until it is answered or the time limit is up
- Depending on if the answer chosen is correct/incorrect, show the appropriate message
- At the end of all the questions, show the player how they did

## Technologies Used
- JavaScript
- jQuery for DOM manipulation
- HTML
- CSS

## Code Explanation
- The logic for the game is in the app.js file: questions are stored as objects, each with a question, an array of choices, and the correct choice
- Each question, in sequential order, is displayed for the user to answer, and the chosen answer is compared to correct answer
- The correct answer is inserted in the HTML element as an id attribute so that the comparison can actually be made in app.js
- Depending on the outcome, variables for correct/incorrect/unanswered questions are incremented and appropriate messages are displayed