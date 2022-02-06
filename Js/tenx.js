'use scrict'
const youtubeMy = document.querySelector('.youtube-for-my');
const videoControl = document.querySelector('.video');

youtubeMy.addEventListener('click', ()=> {
    youtubeMy.style.display = 'none';
    videoControl.setAttribute('controls', 'controls');
})
const listBtn = document.querySelector('.list-btn');
const list = document.querySelector('.list-blog')

listBtn.addEventListener('click',()=>{
    list.classList.toggle('hidden-list');
    listBtn.classList.toggle('bx-x')

}) 
const nextLesson = document.querySelector('.next-lesson');
const sections = document.querySelectorAll('.section');
const tests = document.querySelector('.quiz');

nextLesson.addEventListener('click', ()=> {
    sections.forEach((section)=> {
        section.style.display = 'none';
    })
    list.style.opacity = 0;
    tests.style.display = 'block';
})