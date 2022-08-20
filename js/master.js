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

//Check If There IS Local Storage Random Background Items

let backgroundLocalItem = localStorage.getItem("background_option");

//Check If Random Background local Storage Not Empty

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
}

//Remove Active Class From All Spans

document.querySelectorAll(".random-background span").forEach((element) => {
  element.classList.remove("active");
});
if (backgroundOption === true) {
  document.querySelector(".random-background .yes").classList.add("active");
} else {
  document.querySelector(".random-background .no").classList.add("active");
}
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
    handleActive(e);
  });
});

//Switch Random background  Option

const randomBackEl = document.querySelectorAll(".random-background span");

//Loop On All Span

randomBackEl.forEach((span) => {
  //Click On Evrey Span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      //Add Background Option To Local Storage
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

randomizeImgs();

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

//Select Skills Selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  //Skills Offset Top
  let skillOffsetTop = ourSkills.offsetTop;

  //Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  //window Height
  let windowHeight = this.innerHeight;

  //window scrolltop
  let windowScrollTop = this.pageYOffset;

  let ff = skillOffsetTop + skillsOuterHeight;
  let ss = ff - windowHeight;

  if (windowScrollTop > ss) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};

//Create Popup With The Image

let ourGallery = document.querySelectorAll(".images-box img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //Create Overlay Element
    let overlay = document.createElement("div");
    //Add Class Overlay
    overlay.classList.add("popup-overlay");
    //Append Overlay To Body

    document.body.appendChild(overlay);

    //Create popup
    let popupBox = document.createElement("div");

    //Add Class popupBox
    popupBox.className = "popup-box";

    //Create img
    let popupImage = document.createElement("img");

    //Set Img Source
    popupImage.src = img.src;

    if (img.alt !== null) {
      //Create Hidding
      let imgHeading = document.createElement("h3");
      //Create Text For Heading
      let imgText = document.createTextNode(img.alt);

      //Append Text to the heading
      imgHeading.appendChild(imgText);
      //Apppend The Heading To Popup Box
      popupBox.appendChild(imgHeading);
    }

    //Add Img To Popup Box
    popupBox.appendChild(popupImage);

    document.body.appendChild(popupBox);

    //Create The Close Span
    let closeButton = document.createElement("span");

    //Create the Button Text
    let closeButtonText = document.createTextNode("X");

    //Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    //Add Class To Close Button
    closeButton.className = "close-button";

    //Add Close Button To Popup Box

    popupBox.appendChild(closeButton);
  });
});

//Close Popup

document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    //Remove The Current Popup
    e.target.parentElement.remove();

    //Remove The Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

//Select All bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach((bullet) => {
  bullet.addEventListener("click", function (e) {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const allLinks = document.querySelectorAll(".links a");

allLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//Handel Active State
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  //add active class for target element
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletsLocalItems = localStorage.getItem("bullets_option");

if (bulletsContainer !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletsLocalItems === "block") {
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    document.querySelector(".bullets-option .no").classList.add("active");
  }

  bulletsContainer.style.display = bulletsLocalItems;
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

//Reset button

document.querySelector(".reset-options").onclick = function () {
  //  localStorage.clear();
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");

  window.location.reload();
};

//Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLink = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLink.classList.toggle("open");
};

//Clicked anyWhere OutSide The Menu And Toggle Menu

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLink) {
    if (tLink.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLink.classList.toggle("open");
    }
  }
});

//Stop Propagation menu

tLink.onclick = function (e) {
  e.stopPropagation();
};
