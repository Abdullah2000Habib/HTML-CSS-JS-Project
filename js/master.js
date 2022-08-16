//Check If There Is Local Storage Color Option

let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  //set color on root
  document.documentElement.style.setProperty("--main-color", mainColors);

  //Remove active class from all childrens

  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}
//Random Background Option
let backgroundOption = true;

//Variable To Control The Background Interval

let backgroundInterval;

//Toggle Spin Class On Icon

document.querySelector(".setting-icon .fa-cog").onclick = function () {
  //Toggle Class Fa-Span For Rotation on Self
  this.classList.toggle("fa-spin");
  //Toggle Class Open On Main Setting Box
  document.querySelector(".settings-box").classList.toggle("open");
};

//Switch Color

const colorsLi = document.querySelectorAll(".colors-list li");
//Loop On List Items
colorsLi.forEach((li) => {
  //Click On Evrey List items
  li.addEventListener("click", (e) => {
    //set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    //Remove active class from all childrens

    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    //add active class for target element
    e.target.classList.add("active");
  });
});

//Switch Random background  Option

const randomBackEl = document.querySelectorAll(".random-background span");

//Loop On All Span

randomBackEl.forEach((span) => {
  //Click On Evrey Span
  span.addEventListener("click", (e) => {
    //Remove active class from all childrens

    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    //add active class for target element
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
    }
  });
});

//Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

//Get Array Of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

//Function Randomize Imgs

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //Get Random Numbers
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      //Change Background Images Url
      landingPage.style.backgroundImage =
        'url("images/' + imgsArray[randomNumber] + '")';
    }, 1000);
  }
}
