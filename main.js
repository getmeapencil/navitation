import * as Constants from './constants.js';

// ------------------------------------mouse-trailer-------------------------------------

const trailer = document.getElementById("trailer");
const icon = document.getElementById("icon");

let isMousemoveActive = true;

const animateTrailer = (e, interacting) => {
  if(!isMousemoveActive) return;

  const x = e.clientX - trailer.offsetWidth / 2, 
  y = e.clientY - trailer.offsetHeight / 2;

  const followAnimation = { transform: `translate(${x}px, ${y}px) scale(${interacting ? 5 : 1})` };

  trailer.animate( followAnimation, {
    duration: 500,
    fill: 'forwards'
  });
}

const getSRC = type => {
  switch(type) {
    case "tribute":
      return Constants.tribute;
    case "linkedin":
      return Constants.linkedin;
    case "introgen":
      return Constants.introgen;
    case "js":
      return Constants.js;
    case "portfolio":
      return Constants.portfolio;
    case "form":
      return Constants.form;
    case "brassbones":
      return Constants.brassbones;
  }
}

function handleMousemove(e) {
  if(!isMousemoveActive) return;

  const interactable = e.target.closest(".shape"),
  interacting = interactable !== null;

  animateTrailer(e, interacting);

  if(interacting) {
  icon.style.opacity = 1;
  icon.src = getSRC(interactable.dataset.type);
  } else {
  icon.style.opacity = 0;
  }
}

window.addEventListener('mousemove', handleMousemove);

// ------------------------------------shape-animation-------------------------------------

const wrapper = document.getElementById("wrapper");

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

let prevConfiguration = 1;
let prevRoundness = 1;

let animationInterval;

function startAnimation() {
  animationInterval = setInterval(() => {
    let nextConfiguration = rand(1, 2);
    let nextRoundness = rand(1, 3);
    wrapper.dataset.configuration = nextConfiguration;
    wrapper.dataset.roundness = nextRoundness;
    while (
      (nextConfiguration === 2 && nextRoundness === 3) ||
      (nextConfiguration === prevConfiguration && nextRoundness === prevRoundness)
    ) {
      nextConfiguration = rand(1, 2);
      nextRoundness = rand(1, 3);
      wrapper.dataset.configuration = nextConfiguration;
      wrapper.dataset.roundness = nextRoundness;
    }
    prevConfiguration = nextConfiguration;
    prevRoundness = nextRoundness;
  }, 3000);
}

function stopAnimation() {
  clearInterval(animationInterval);
}

wrapper.addEventListener("mouseenter", stopAnimation);
wrapper.addEventListener("mouseleave", startAnimation);

startAnimation();

// ------------------------------------scale-redirect-------------------------------------

function scaleRedirect(e) {
  const clickedDiv = e.target.closest(".shape");
  if(clickedDiv === null) return;

  isMousemoveActive = false;

  const translateAnimation = { top: "50%", left: "50%", transform: `translate(-50%, -50%)`, height: "5rem", width: "5rem", borderRadius: "5rem", opacity: "1" };

  trailer.animate( translateAnimation, {
    duration: 0,
    fill: "forwards"
  });

  const opacityAnimation = { height: "100%", width: "100%", borderRadius: "0" };

  trailer.animate( opacityAnimation, {
    duration: 500,
    easing: "linear",
    fill: "forwards"
  });

  const url = clickedDiv.getAttribute("data-url");
        
  setTimeout(() => {
      window.location.href = url;
  }, 700);
  wrapper.removeEventListener("click", scaleRedirect);
}

wrapper.addEventListener("click", scaleRedirect);

let content = document.querySelector('.content');

document.addEventListener('DOMContentLoaded', function() {
  content.style.display = 'grid';
});



window.addEventListener('pageshow', function(e) {
  if (e.persisted) {
    isMousemoveActive = true;
    trailer.animate( { top: "0", left: "0", height: "1rem", width: "1rem", borderRadius: "0.5rem", opacity: "1" }, {
      duration: 0,
      fill: "forwards"
    });
    wrapper.addEventListener("click", scaleRedirect);
  }
});