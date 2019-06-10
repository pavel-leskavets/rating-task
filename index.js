let containerOfStars = document.querySelector(".main-container");
containerOfStars.addEventListener("click", getCurrentStar);
containerOfStars.addEventListener("mouseover", getCurrentStar);
containerOfStars.addEventListener("mouseout", starCleaning);
let countOfStars = 0;

function getCurrentStar(e) {
  if (e.target.classList.contains("fas")) {
    if (e.target.classList.contains("first-star")) {
      countOfStars = 0;
    } else if (e.target.classList.contains("second-star")) {
      countOfStars = 1;
    } else if (e.target.classList.contains("third-star")) {
      countOfStars = 2;
    } else if (e.target.classList.contains("fourth-star")) {
      countOfStars = 3;
    } else if (e.target.classList.contains("fifth-star")) {
      countOfStars = 4;
    }
    let arrOfStars = e.target.parentElement.querySelectorAll(".fas");

    drawStars(countOfStars, arrOfStars);
  }
}
function drawStars(count, arr) {
  arr.forEach(item => {
    item.classList.remove("yellow");
  });
  for (let i = 0; i <= count; i++) {
    arr[i].classList.add("yellow");
  }
}
function starCleaning(e) {
  if (e.target.classList.contains("film-container") && state !== true) {
    let arrOfStars = e.target.parentElement.querySelectorAll(".fas");
    arrOfStars.forEach(item => {
      item.classList.remove("yellow");
    });
    state = false;
  }
}