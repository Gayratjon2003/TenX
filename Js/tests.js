const nextBtn = document.querySelector("#nextBtn");

const mulChoise = document.querySelector(".mulChoise");
const trueFalse = document.querySelector(".trueFalse");
const notOneAnswer = document.querySelector(".notOneAnswer");
const questionTyping = document.querySelector(".questionTyping");

const quiz_body_title = document.querySelector(".quiz_body_title");

let scores = 0;
let currentQuestionIndex = 0;

const beginTest = async () => {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const responseData = await response.json();

    const switchQuestion = () => {
      const currentQuestion = responseData[currentQuestionIndex];

      quiz_body_title.textContent = currentQuestion.question;

      if (currentQuestion.answers.length === 2) {
        mulChoise.classList.add("hidden");
        notOneAnswer.classList.add("hidden");
        questionTyping.classList.add("hidden");

        trueFalse.classList.remove("hidden");

        const variants = trueFalse.querySelectorAll("p");

        for (let i = 0; i < variants.length; i++) {
          variants[i].textContent = currentQuestion.answers[i];
        }

        // checkAnswer("trueFalse", currentQuestion.correctAnswer);
      } else if (currentQuestion.answers.length === 4) {
        notOneAnswer.classList.add("hidden");
        questionTyping.classList.add("hidden");
        trueFalse.classList.add("hidden");

        mulChoise.classList.remove("hidden");

        const variants = mulChoise.querySelectorAll("p");

        // console.log(variants);

        for (let i = 0; i < variants.length; i++) {
          variants[i].textContent = currentQuestion.answers[i];
        }
        // checkAnswer("mulChoise", currentQuestion.correctAnswer);
      } else if (currentQuestion.answers.length === 0) {
        notOneAnswer.classList.add("hidden");
        mulChoise.classList.add("hidden");
        trueFalse.classList.add("hidden");

        questionTyping.classList.remove("hidden");
        // checkAnswer("questionTyping", currentQuestion.correctAnswer);
      }

      currentQuestionIndex++;
    };

    function checkAnswer() {
      const prevQuestion = responseData[currentQuestionIndex - 1];

      let radios;

      if (prevQuestion.answers.length === 2) {
        radios = document.querySelector(".trueFalse").querySelectorAll("input");
      } else if (prevQuestion.answers.length === 4) {
        radios = document.querySelector(".mulChoise").querySelectorAll("input");
      } else if (prevQuestion.answers.length > 4) {
        radios = document
          .querySelector(".notOneAnswer")
          .querySelectorAll("input");
      } else {
        radios = document
          .querySelector(".questionTyping")
          .querySelectorAll("input");
      }

      if (radios.length === 1) {
        if (radios[0].value === prevQuestion.correctAnswer[0]) {
          scores++;
        }
      } else if (radios.length < 5) {
        for (let i = 0; i < radios.length; i++) {
          if (radios[i].checked) {
            if (
              radios[i].parentElement.nextElementSibling.children[0]
                .textContent === prevQuestion.correctAnswer[0]
            ) {
              scores++;
            }
          }
        }
      }

      console.log(scores);

      if (currentQuestionIndex !== responseData.length) {
        switchQuestion();
      } else {
        console.log("gameOver");
        nextBtn.disabled = true;
        const nextLesson = document.querySelector('.next-lesson');
        const sections = document.querySelectorAll('.section');
        const tests = document.querySelector('.quiz');
        sections.forEach((section) => {
          section.style.display = 'block';
        })
        list.style.opacity = 1;
        tests.style.display = 'none';
      }
    }

    nextBtn.addEventListener("click", checkAnswer);

    switchQuestion();
  } catch (error) {
    console.log(error.message);
  }
};

beginTest();
