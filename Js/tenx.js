// "use scrict";
const youtubeMy = document.querySelector(".youtube-for-my");
const videoControl = document.querySelector(".video");

const quizSection = document.querySelector(".quiz");
const sectionMy = document.querySelector(".section-my");
const sectionBlogs = document.querySelector(".section-blogs");
const sectionPost = document.querySelector(".section-post");

youtubeMy.addEventListener("click", () => {
  youtubeMy.style.display = "none";
  videoControl.setAttribute("controls", "controls");
});
const listBtn = document.querySelector(".list-btn");
const listMy = document.querySelector(".list-blog");
listBtn.addEventListener("click", () => {
  listMy.classList.toggle("hidden-list");
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
const beginTest = (responseData) => {
  console.log("begin test");
  quizSection.classList.remove("hidden");
  sectionMy.classList.add("hidden");
  sectionBlogs.classList.add("hidden");
  sectionPost.classList.add("hidden");

  console.log("responseData", responseData);
  const switchQuestion = () => {
    // currentQuestionIndex = 0;
    const currentQuestion = responseData[currentQuestionIndex];
    quiz_body_title.textContent = currentQuestion.question;
    if (currentQuestion.status === "trueFalse") {
      mulChoise.classList.add("hidden");
      notOneAnswer.classList.add("hidden");
      questionTyping.classList.add("hidden");
      trueFalse.classList.remove("hidden");
      const variants = trueFalse.querySelectorAll("p");
      for (let i = 0; i < variants.length; i++) {
        variants[i].textContent = currentQuestion.answers[i];
      }
      // checkAnswer("trueFalse", currentQuestion.correctAnswer);
    } else if (currentQuestion.status === "mulChoise") {
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
    } else if (currentQuestion.status === "questionTyping") {
      notOneAnswer.classList.add("hidden");
      mulChoise.classList.add("hidden");
      trueFalse.classList.add("hidden");
      questionTyping.classList.remove("hidden");
      // checkAnswer("questionTyping", currentQuestion.correctAnswer);
    }
    currentQuestionIndex++;

    if (currentQuestionIndex === responseData.length) {
      // currentQuestionInfex = 0;
    }
  };
  function checkAnswer() {
    const prevQuestion = responseData[currentQuestionIndex - 1];
    let radios;
    if (prevQuestion.status === "trueFalse") {
      radios = document.querySelector(".trueFalse").querySelectorAll("input");
    } else if (prevQuestion.status === "mulChoise") {
      radios = document.querySelector(".mulChoise").querySelectorAll("input");
    } else {
      radios = document
        .querySelector(".questionTyping")
        .querySelectorAll("input");
    }

    if (radios.length === 1) {
      if (radios[0].value === prevQuestion.correctAnswer) {
        scores++;
      }
    } else if (radios.length < 5) {
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          if (
            radios[i].parentElement.nextElementSibling.children[0]
              .textContent === prevQuestion.correctAnswer
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
      currentQuestionIndex = 0;
      // nextBtn.disabled = true;
      sections.forEach((section) => {
        // const nextLesson = document.querySelector(".next-lesson");
        // const sections = document.querySelectorAll(".section");
        // const tests = document.querySelector(".quiz");
        //   section.style.display = "block";
      });
      const modalMy = document.querySelector(".modal-my");
      tests.classList.add("hidden");
      modalMy.style.display = "block";
    }
  }
  nextBtn.addEventListener("click", checkAnswer);

  switchQuestion();
};

nextLesson.addEventListener("click", () => {
  sections.forEach((section) => {
    section.style.display = "none";
  });
  tests.style.display = "block";
  tests.classList.remove("hidden");

  beginTest();
});

//  Testlardan keyin chiqadigan modal
const modalBtn = document.querySelector(".nextBtn");
const modalMy = document.querySelector(".modal-my");
// modalBtn.addEventListener('click',()=> {
//     modalMy.classList.remove('hidden');
// })

const nextLessonBtn = document.querySelector(".next-btn-my");
nextLessonBtn.addEventListener("click", () => {
  sections.forEach((section) => {
    const nextLesson = document.querySelector(".next-lesson");
    const sections = document.querySelectorAll(".section");
    const tests = document.querySelector(".quiz");
    section.style.display = "block";
    modalMy.style.display = "none";
  });
});

const listBlog = document.querySelector(".list-blog");

(async () => {
  try {
    const response = await fetch(
      "https://dry-tundra-80368.herokuapp.com/api/lessons"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const responseData = await response.json();

    const switchLesson = (id, isTest = false) => {
      const lessonData = responseData.data.filter((lesson) => lesson.id === id);
      const video = document.querySelector(".video");
      const textBody = document.querySelector(".section-blogs-box-p");
      // console.log(lessonData[0].attributes.content);
      if (!isTest) {
        video.src = lessonData[0].attributes.video;
        textBody.textContent = lessonData[0].attributes.content;
      } else {
        console.log("inSwitch");
        const quizzesOfLessons = responseData.data.find(
          (lesson) => lesson.id === id
        );
        console.log("quizLesson", quizzesOfLessons.attributes.quizJson);

        beginTest(quizzesOfLessons.attributes.quizJson);
      }
    };

    responseData.data.map((lesson) => {
      console.log(lesson.id);
      console.log(lesson);
      const wrapper = document.createElement("div");
      wrapper.classList.add("div-my");
      wrapper.style.width = "95%";
      const listHeader = document.createElement("div");
      listHeader.className = "list-header";

      const listHeaderContent = document.createElement("h1");
      listHeaderContent.textContent = lesson.attributes.title;
      console.log(lesson.attributes.video);
      // video.src = lesson.attributes.video;
      listHeader.append(listHeaderContent);

      wrapper.append(listHeader);

      const lessonContainer = document.createElement("div");
      lessonContainer.className = "list-blog-container";
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

      lessonContainer.addEventListener("click", () => {
        switchLesson(lesson.id);
      });

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

      const quizHandler = () => {
        currentQuestionIndex = 0;
        console.log(currentQuestionIndex);
        //1.param lesson id bu dars id
        // 2. param true -> test; false-> lesson
        console.log("id", lesson.id);
        switchLesson(lesson.id, true);
        console.log("after id");
      };

      quizContainer.addEventListener("click", quizHandler);

      wrapper.append(quizContainer);

      listBlog.append(wrapper);
    });

    console.log("salom");
  } catch (error) {
    console.log(error.message);
  }
})();
