const questions = [
    {
        question: "Eu e o Henrique Falamos?",
        answers: [
            { id: 1, text: "UOUOUOUUOOUOUO", correct: true },
            { id: 2, text: "Very nice", correct: false },
            { id: 3, text: "beleza", correct: false },
            { id: 4, text: "a", correct: false },
        ],
    },
    {
        question: "Quantos de Altura o Henrique tem?",
        answers: [
            { id: 1, text: "1,80", correct: false },
            { id: 2, text: "1,75", correct: true },
            { id: 3, text: "1,50", correct: false },
            { id: 4, text: "1,99", correct: false },
        ],
    },
    {
        question: "Qual o Nome Do Meio Do Ruan?",
        answers: [
            { id: 1, text: "Lima", correct: false },
            { id: 2, text: "Santos", correct: false },
            { id: 3, text: "Rocha", correct: false },
            { id: 4, text: "Candido", correct: true },
        ],
    },
    {
        question: "Qual o Nome da Cachorra do Henrique?",
        answers: [
            { id: 1, text: "Cristal", correct: true },
            { id: 2, text: "Zequinha", correct: false },
            { id: 3, text: "Ratinha", correct: false },
            { id: 4, text: "N.D.A", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    nextButton.style.display = "none";
    showQuestions();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.find((answer) => answer.correct);

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você Conhece a Gente?: ${score} de ${questions.length}`;
    nextButton.innerHTML = "Jogar novamente";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();