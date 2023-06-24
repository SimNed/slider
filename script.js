const slider = document.getElementById("slider");
const slides = slider.querySelectorAll(".slide");

const sliderNav = document.getElementById("slider-nav");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

let isScrolling = false;

let activeSlide = {
    value: 0,
    get index() { return this.value },
    set index(value) {
        if(typeof value !== 'number' || value < -1 || value > slides.length)
            return
            
        if(value === -1)
            value = slides.length - 1;
        else if(value === slides.length)
            value = 0;

        slider.scroll({left: slides[value].offsetLeft - slider.offsetLeft, behavior: 'smooth'});
        
        this.value = value 
    }
};

// Windows Events

window.onload = () => {
    for(let i = 0; i < slides.length; i++){
        let li = document.createElement('li');
        
        li.addEventListener("click", () => activeSlide.index = i);
        li.appendChild(document.createTextNode('•'));
        
        sliderNav.appendChild(li);
    }
}

window.onresize = () => {
    slider.scroll({left: slides[activeSlide.index].offsetLeft - slider.offsetLeft, behavior: 'instant'});
}

// Event Listeners

slider.addEventListener("scroll", () => {
    if(!isScrolling) { isScrolling = true; }
});

slider.addEventListener("scrollend", () => {
    isScrolling = false;
});

nextButton.addEventListener("click", () => {
    if(!isScrolling)
        activeSlide.index = activeSlide.index + 1;
});

prevButton.addEventListener("click", () => {
    if(!isScrolling)
    activeSlide.index = activeSlide.index - 1;
});