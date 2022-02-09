'use strict'

const nextLessonMy = document.querySelector('.next-btn-my');
const videoMy = document.querySelector('.video');
const textBody = document.querySelector('.section-blogs-box-p');

nextLessonMy.addEventListener('click', ()=> {
    const baseUrl = `https://dry-tundra-80368.herokuapp.com`;
    fetch(`${baseUrl}/api/lessons?populate=*`)
.then(data=> {
    return data.json()
}).then(data=> {
    // console.log(data.data[0].id);g
        // const element = i;
        // console.log(element);
        // videoMy.src = data.data[0].attributes.video;
        // console.log(data.data[i].attributes.video);
        // console.log(data.data[2].attributes.content);
        if (videoMy.src == data.data[0].attributes.video) {
            console.log('ha');
            // console.log(data.data[i].attributes);
            videoMy.src = data.data[1].attributes.video;

            textBody.textContent = data.data[1].attributes.content;
        } else if (videoMy.src == data.data[1].attributes.video) {
            console.log('ha');
            console.log(data.data);
            // console.log(data.data[2].attributes);
            videoMy.src = data.data[2].attributes.video;

            textBody.textContent = data.data[2].attributes.content;
        }
        else if (videoMy.src == data.data[2].attributes.video) {
            console.log('ha');
            // console.log(data.data[2].attributes);
            videoMy.src = data.data[3].attributes.video;

            textBody.textContent = data.data[3].attributes.content;
        }
        
        else {
            console.log('yoq');
        }
});


})