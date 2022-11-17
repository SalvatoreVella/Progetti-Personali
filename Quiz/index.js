const quizCont = document.getElementById("quiz");
const questBody = document.getElementById("quest-body");
const category = document.getElementById("category");
const questTitle = document.getElementById("question-t");
const difficulty = document.getElementById("level");
const aText = document.getElementById("a-text");
const bText = document.getElementById("b-text");
const cText = document.getElementById("c-text");
const dText = document.getElementById("d-text");
const quizBtn = document.getElementById("submit");
const aCheck = document.getElementById("a");
const bCheck = document.getElementById("b");
const cCheck = document.getElementById("c");
const dCheck = document.getElementById("d");

let question;
let questCounter = 1;
let score = 0;

const renderQst = async () => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=1');
        const respJson = await response.json();
        question = await respJson.results[0];
        let shufflerArray = new Array(...question.incorrect_answers, question.correct_answer);
        if (shufflerArray.length > 4) {
            shufflerArray = shufflerArray.slice(shufflerArray.length - 4)
        }
        const sortedAnswers = shufflerArray.sort();
        let noDisplay = document.querySelectorAll(".none");
        category.innerHTML = question.category
        questTitle.innerHTML = question.question;
        difficulty.innerHTML = question.difficulty;
        aText.innerHTML = sortedAnswers[1];
        bText.innerHTML = sortedAnswers[2];
        cText.innerHTML = sortedAnswers[0];
        dText.innerHTML = sortedAnswers[3];
        if (sortedAnswers.length == 2) {
            noDisplay.forEach(el => el.style.display = "none")
        } else {
            noDisplay.forEach(el => el.style.display = "inline-block")
        }
    } catch (err) {
        throw err;
    }
};


const setHandlers = () => {
    quizBtn.addEventListener("click", (e) => {
        let checked = document.querySelector('input:checked');
        if (questCounter < 10) {
            renderQst();
        } else if (questCounter === 10) {
            setTimeout(() => {
            category.innerHTML = `Congratulation. ${score}/10 Correct answers!`;
            questBody.style.display = "none";
            quizBtn.innerHTML = `Try Again`;
            quizBtn.addEventListener("click", () => {
                questCounter = 0;
                questBody.style.display = "block";
                quizBtn.innerHTML = `Submit Answer`;
                renderQst();
            });
        }, 200);
        } 
        const selected = checked.nextElementSibling.innerHTML;
        if (String(selected) == question.correct_answer) {
            score++;
        }
    checked.checked = false;
    questCounter++
    console.log(score);
});
};

(async () => {
    await renderQst();
    setHandlers();
})();