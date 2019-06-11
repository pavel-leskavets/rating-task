let containerOfStars = document.querySelector(".main-container");
let countOfStars = 0;
let button = document.querySelector(".form-button");
let inputValue = "";
const arrOfActiveStars = [];

button.addEventListener("click", addNewFilm);
document.body.addEventListener("keydown", addNewFilm);

containerOfStars.addEventListener("click", getCurrentStar);
containerOfStars.addEventListener("mouseover", getCurrentStar);

containerOfStars.addEventListener("mouseout", starCleaning);

function getCurrentStar(e) {
  let markDiv = e.target.parentElement.parentElement;

  if (markDiv.classList.contains("mark")) {
    return;
  }
  if (e.target.classList.contains("fas")) {
    if (e.target.classList.contains("first-star")) {
      countOfStars = 0;
      markDiv.dataset.position = countOfStars + 1;
    } else if (e.target.classList.contains("second-star")) {
      countOfStars = 1;
      markDiv.dataset.position = countOfStars + 1;
    } else if (e.target.classList.contains("third-star")) {
      countOfStars = 2;
      markDiv.dataset.position = countOfStars + 1;
    } else if (e.target.classList.contains("fourth-star")) {
      countOfStars = 3;
      markDiv.dataset.position = countOfStars + 1;
    } else if (e.target.classList.contains("fifth-star")) {
      countOfStars = 4;
      markDiv.dataset.position = countOfStars + 1;
    }
    if (e.type === "click") {
      markDiv.classList.add("mark");
      if (arrOfActiveStars.indexOf(countOfStars) === -1) {
        arrOfActiveStars.push(countOfStars);
        sortFilmsByRate();
      } else {
        sortFilmsByTitle();
      }
    }
    let arrOfStars = e.target.parentElement.querySelectorAll(".fas");

    drawStars(countOfStars, arrOfStars);
  }
}
function drawStars(count, arr) {
  arr.forEach(item => {
    item.classList.remove("checked");
  });
  for (let i = 0; i <= count; i++) {
    arr[i].classList.add("checked");
  }
}
function starCleaning(e) {
  if (e.target.classList.contains("film-container")) {
    if (e.target.classList.contains("mark")) {
      return;
    }
    let arrOfStars = e.target.querySelectorAll(".fas");
    arrOfStars.forEach(item => {
      item.classList.remove("checked");
    });
  }
}
function sortFilmsByRate() {
  Array.from(document.querySelectorAll(".mark"))
    .sort(({ dataset: { position: a } }, { dataset: { position: b } }) => {
      return a.localeCompare(b);
    })
    .forEach(item =>
      item.parentNode.insertBefore(item, item.parentNode.firstChild)
    );
}
function sortFilmsByTitle() {
  const arr = [];

  Array.from(document.querySelectorAll(".mark"))
    .sort((a, b) => {
      return a.firstElementChild.innerHTML.localeCompare(
        b.firstElementChild.innerHTML
      );
    })
    .forEach(item => {
      arr.push(item);
    });
  arr.sort((a, b) => {
    if (a.innerText > b.innerText) {
      return 1;
    }
    if (a.innerText === b.innerText) {
      return 0;
    }
    if (a.innerText < b.innerText) {
      return -1;
    }
  });

  arr.reverse().forEach(item => {
    item.parentNode.insertBefore(item, item.parentNode.firstChild);
  });
}
function getInputValue() {
  let input = document.querySelector(".form-input");
  inputValue = input.value;
  input.value = "";
}
function addNewFilm(e) {
  if (e.type === "click" || e.code === "Enter") {
    getInputValue();
    let newFilm = document.createElement("div");
    newFilm.className = "film-container";
    newFilm.dataset.position = "0";
    newFilm.innerHTML = `<div class="film-title">${inputValue}</div>
        <div class="film-rating">
          <i class="fas fa-star first-star"></i>
          <i class="fas fa-star second-star"></i>
          <i class="fas fa-star third-star"></i>
          <i class="fas fa-star fourth-star"></i>
          <i class="fas fa-star fifth-star"></i>
    </div>`;
    document.querySelector(".main-container").appendChild(newFilm);
  }
}
function storageSet() {
  if (localStorage) {
    localStorage.clear();
  }
  let mainContainer = containerOfStars.innerHTML;
  const condition = [];
  const items = document.querySelectorAll(".fa-star");
  for (let i = 0; i < items.length; i++) {
    condition.push(window.getComputedStyle(items[i]).color);
  }
  localStorage.setItem("condition", JSON.stringify(condition));
  localStorage.setItem("mainContainer", JSON.stringify(mainContainer));
}
containerOfStars.addEventListener("click", storageSet);

function storageGet() {
  if (localStorage) {
    const newCondition = JSON.parse(localStorage.getItem("condition"));

    const items = document.querySelectorAll(".fa-star");
    for (let i = 0; i < items.length; i++) {
      items[i].style.color = newCondition[i];
    }
  }
  containerOfStars.innerHTML = JSON.parse(
    localStorage.getItem("mainContainer")
  );
}
document.addEventListener("DOMContentLoaded", storageGet);
