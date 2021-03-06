const buttons = document.querySelectorAll(".icons");
const testimonials = document.querySelectorAll(".testimonials");
const testimonialLetters = document.querySelector(".testimonialLetters");
const totalTestimonials = testimonials.length;

let current = 0;
let vw;
let startX;
let resizeTimeout;

(function init() {
    setSlider();

    window.onresize = function(){
        clearTimeout(resizeTimeout);
        resizeTimeout= setTimeout (handleResize, 100);
    } 

    for(i=0; i < testimonials.length; i++) {
        testimonials[i].style.width = vw + "px";
    }

    for(i=0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", changeSlide)
        window.addEventListener("keydown", changeSlideKey)
        document.addEventListener('touchstart', Swipe);
        document.addEventListener('touchend', endSwipe, false);
    }
})();



function setSlider() {
    vw = window.innerWidth;
    sliderWidth = vw * totalTestimonials;
    testimonialLetters.style.width = sliderWidth + "px";
    for(i=0; i < testimonials.length; i++) {
        testimonials[i].style.width = vw + "px";
    }
}

function handleResize() {
    setSlider();
}

//change slide with mouse click 
function changeSlide() {
   
    let action = this.getAttribute("data-action");
    if(action == "p") {
        next();
        goSlide(current);
    } 
    else if(action == "n") {
        prev();
        goSlide(current);
    }
   
  
}

//change slide with keyboard click
function changeSlideKey(event) {
    if(event.keyCode == 37) {
       
        next();
        goSlide(current);
    } 
    else if(event.keyCode == 39) {
        prev();
        goSlide(current);
    }
}


//change slide with touch
function Swipe(event) {
    var touch = event.touches[0];
    startX = touch.pageX;
}

function endSwipe(event) {
    var touch = event.changedTouches[0];
    dist = touch.pageX - startX;
    if(dist > 50 && dist < 300 ) {
        next();
        goSlide(current);
    } else if(dist < -50 && dist > -300) {
        prev();
        goSlide(current);
    }
     return false;
}

//choosing next or prev slide
function next() {
    if(current > 0) {
        current--;
    } else {
        current = totalTestimonials -1;
    }
}

function prev () {
    if(current < totalTestimonials-1) {
        current = totalTestimonials -1;
    } else if (current >= totalTestimonials-1) {   
        current--;  
    }
}



//take current and go to the right slide
function goSlide(change) {    
    let newWidth = change * vw;
    testimonialLetters.style.transform = "translate(" + -newWidth + "px)";
}

