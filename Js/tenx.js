"use scrict";
const youtubeMy = document.querySelector(".youtube-for-my");
const videoControl = document.querySelector(".video");

youtubeMy.addEventListener("click", () => {
  youtubeMy.style.display = "none";
  videoControl.setAttribute("controls", "controls");
});
const listBtn = document.querySelector(".list-btn");
const list = document.querySelector(".list-blog");

listBtn.addEventListener("click", () => {
  list.classList.toggle("hidden-list");
  listBtn.classList.toggle("bx-x");
});
const nextLesson = document.querySelector(".next-lesson");
const sections = document.querySelectorAll(".section");
const tests = document.querySelector(".quiz");

// const nextBtn = document.querySelector("#nextBtn");

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
        sections.forEach((section) => {
          // const nextLesson = document.querySelector(".next-lesson");
          // const sections = document.querySelectorAll(".section");
          // const tests = document.querySelector(".quiz");
        //   section.style.display = "block";
        });
        const modalMy = document.querySelector('.modal-my');
        list.style.opacity = 1;
        tests.style.display = "none";
        modalMy.style.display ='block';
      }
    }
    nextBtn.addEventListener("click", checkAnswer);
    switchQuestion();
  } catch (error) {
    console.log(error.message);
  }
};

nextLesson.addEventListener("click", () => {
  sections.forEach((section) => {
    section.style.display = "none";
  });
  list.style.opacity = 0;
  tests.style.display = "block";
  tests.classList.remove('hidden')

  beginTest();
});

//  Testlardan keyin chiqadigan modal
const modalBtn = document.querySelector('.nextBtn');
const modalMy = document.querySelector('.modal-my');
// modalBtn.addEventListener('click',()=> {
//     modalMy.classList.remove('hidden');
// })

const nextLessonBtn = document.querySelector('.next-btn-my');
nextLessonBtn.addEventListener('click', ()=> {
    sections.forEach((section) => {
        const nextLesson = document.querySelector(".next-lesson");
        const sections = document.querySelectorAll(".section");
        const tests = document.querySelector(".quiz");
        section.style.display = "block";
        modalMy.style.display = 'none';
      });
})

const listBlog = document.querySelector(".list-blog");

(async () => {
  try {
    const response = await fetch("http://localhost:1337/api/lessons");

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const responseData = await response.json();

    responseData.data.map((lesson) => {
    //   console.log(lesson);
      const wrapper = document.createElement("div");
        wrapper.classList.add('div-my')
        wrapper.style.width = '95%';
      const listHeader = document.createElement("div");
      listHeader.className = "list-header";

      const listHeaderContent = document.createElement("h1");
      listHeaderContent.textContent = lesson.attributes.title;
        console.log(lesson?.attributes?.video);
        videoControl.src = lesson?.attributes?.video;
      listHeader.append(listHeaderContent);
      wrapper.append(listHeader);
      const lessonContainer = document.createElement("div");
      lessonContainer.className = "list-blog-container";
        lessonContainer.id = lesson.id;
      lessonContainer.innerHTML = `
        <div class="list-content-box-blog">
            <span class="file-icon-my"><i class="bx bx-file"></i></span>
            <p class="list-blog-content">
                ${lesson.attributes.title}
            </p>
            <input type="checkbox" id="checkbox" />
            <label for="checkbox" class="checkbox-my"></label>
        </div>
        `;

      wrapper.append(lessonContainer);

      const quizContainer = document.createElement("div");
      quizContainer.className = "list-blog-container";
      quizContainer.innerHTML = `
        <div class="list-content-box-blog">
            <span class="file-icon-my"><i class="bx bx-file"></i></span>
            <p class="list-blog-content">
                ${lesson.attributes.title}
            </p>
            <input type="checkbox" id="checkbox" />
            <label for="checkbox" class="checkbox-my"></label>
        </div>
        `;

      wrapper.append(quizContainer);

      listBlog.append(wrapper);
    });

  } catch (error) {
    console.log(error.message);
  }
})();

