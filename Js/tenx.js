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

}) 
