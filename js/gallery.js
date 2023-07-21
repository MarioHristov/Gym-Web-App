var previousBtn = document.getElementById('previous-button');
var nextBtn = document.getElementById('next-button');
var imageContainers = document.querySelectorAll('.img-card');
const closeButton = document.getElementsByClassName('close')[0];

const nextImage = document.querySelector('.fa-chevron-right');
const previousImage = document.querySelector('.fa-chevron-left');


const modal = document.getElementById('modal');
var modalImage = document.getElementById('modal-image');

var images = [
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_1.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_2.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_3.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_4.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_5.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_6.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_7.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_8.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_9.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_10.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_11.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_12.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_13.png',
    'http://localhost:8080/GymWebApp/gym_web_app_photos/image_gallery/gym_image_14.png',
];
var startIndex = 0;
var imgCount = 3;

function loadImages() {

    for (let i = 0; i < imageContainers.length; i++) {
        imageContainers[i].innerHTML = '';
    }

    for (let i = 0; i < imgCount; i++) {
        var currentIndex = startIndex + i;
        if (currentIndex < images.length) {
            var image = new Image();
            image.src = images[currentIndex];
            imageContainers[i].appendChild(image);
        }
    }

    previousBtn.disabled = startIndex === 0;
    nextBtn.disabled = startIndex + imgCount >= images.length;

    if(previousBtn.disabled)
    {
        previousBtn.classList.add('disabled');
    }
    else if(previousBtn.classList.contains('disabled')){
        previousBtn.classList.remove('disabled');
    }

    if(nextBtn.disabled)
    {
        nextBtn.classList.add('disabled');
    }
    else if(nextBtn.classList.contains('disabled')){
        nextBtn.classList.remove('disabled');
    }
}
function fancyWindow(img) {
    modalImage.src = img.firstChild.src;
    modal.style.display = 'block';
}

previousBtn.addEventListener('click', function () {
    if (startIndex > 0) {
        startIndex -= imgCount;
        loadImages();
    }
});
nextBtn.addEventListener('click', function () {
    if (startIndex < images.length) {
        startIndex += imgCount;
        loadImages();
    }
});

imageContainers.forEach(div => {

    div.addEventListener('mouseover', () => {
        div.classList.add('focus');
    });

    div.addEventListener('mouseout', () => {
        div.classList.remove('focus');
    });
});

loadImages();



imageContainers.forEach(div => {
    div.addEventListener('click', () => {
        fancyWindow(div);
    });
});

closeButton.addEventListener('click', function () {
    // Hide the modal window
    modal.style.display = 'none';
});

nextImage.addEventListener('click', function(){
    var nextImageIndex = images.indexOf(modalImage.src) + 1;

    if(nextImageIndex === images.length)
    {
        modalImage.src = images[0];
    }
    else{
        
        modalImage.src = images[nextImageIndex];
    }
});
previousImage.addEventListener('click', function(){
    var previousImageIndex = images.indexOf(modalImage.src) - 1;
    if(previousImageIndex < 0)
    {
        modalImage.src = images[images.length - 1];
    }
    else{
        modalImage.src = images[previousImageIndex];
    }
});