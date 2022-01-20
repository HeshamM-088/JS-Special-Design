// on loading page
function onloading() {

    myVar = setTimeout(showPage, 2500);

}

function showPage() {
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".settings-box").style.display = "block";
    document.querySelector(".navbullets-load").style.display = "block";
    document.querySelector(".main").style.display = "block";
}
/*******************************************************************************************************************/

// button to scroll up


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};


/********************************************************************************************************************/
// check localStorage

let colorLocal = localStorage.getItem("color-option");

if (colorLocal !== null) {

    document.documentElement.style.setProperty("--main-color", colorLocal);

    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        if (element.dataset.color === colorLocal) {
            element.classList.add("active");
        }
    });

}


/*********************************************************************************************************/
// change left side bar
document.querySelector(".toggle-settings .fa-cog").onclick = function() {

    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open");

    document.querySelector(".settings-box").style.transition = "0.5s";

    document.querySelector(".toggle-settings").classList.toggle("changebg");

    // document.querySelector(".landing-page").style.marginLeft = "200px";

    let classOpenCheck = document.querySelector(".settings-box");

    if (classOpenCheck.className.indexOf("open") !== -1) {

        document.querySelector(".main").style.marginLeft = "200px";

        document.querySelector(".nav-bullets").marginRight = "0px";

    } else {

        document.querySelector(".main").style.marginLeft = "0px";

        document.querySelector(".nav-bullets").marginRight = "0px";

    }

    this.classList.toggle("color");

};
/*********************************************************************************************************/
// change main design color

const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {

    li.addEventListener("click", (e) => {

        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        localStorage.setItem("color-option", e.target.dataset.color);

        changeClassStatus(e);

    });
});
/*********************************************************************************************************/
let backgroundOption = true;

let backgroundInterval;
/**********************************************************************************************************/
let backgLocal = localStorage.getItem("background-option")

if (backgLocal !== null) {

    document.querySelectorAll(".random-background span").forEach(element => {

        element.classList.remove("active");
    });

    if (backgLocal === 'true') {

        document.querySelector(".random-background .yes").classList.add("active");

        backgroundOption = true;

    } else {

        document.querySelector(".random-background .no").classList.add("active");

        backgroundOption = false;

    }

}
/**********************************************************************************************************/
// change random background images status

const backgroundEl = document.querySelectorAll(".random-background span");

backgroundEl.forEach(span => {

    span.addEventListener("click", (e) => {

        changeClassStatus(e);

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;

            randomBackground();

            localStorage.setItem("background-option", true);

        } else {

            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background-option", false);
        }

    });
});
/*********************************************************************************************************/
// show/hide bullets + save it in local storage

let bulletsEl = document.querySelector(".nav-bullets");

let bulletsSpan = document.querySelectorAll(".remove-bullets span");

let bulletLocal = localStorage.getItem("remove-bullets");

if (bulletLocal !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocal === 'block') {

        bulletsEl.style.display = 'block';

        document.querySelector(".remove-bullets .yes").classList.add("active");

    } else {

        bulletsEl.style.display = 'none';

        document.querySelector(".remove-bullets .no").classList.add("active");

    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (s) => {

        changeClassStatus(s);

        if (s.target.dataset.background === 'yes') {

            bulletsEl.style.display = 'block';

            localStorage.setItem("remove-bullets", 'block');

        } else {

            bulletsEl.style.display = 'none';

            localStorage.setItem("remove-bullets", 'none');

        }

    });

});

/*********************************************************************************************************/
// change images in background landing
let landingPage = document.querySelector(".landing-page");

let imagesArray = ["bg-1.png", "bg-2.png", "bg-3.png", "bg-4.png", "bg-5.png", "bg-6.png"];

function randomBackground() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {

            let randomNumber = Math.floor(Math.random() * imagesArray.length);

            landingPage.style.backgroundImage = 'url("images/' + imagesArray[randomNumber] + '")';

            // landingPage.style.transition = "0.3s";

        }, 5000);
    }
}

randomBackground();
/*********************************************************************************************************/

let ourSkills = document.querySelector(".skills");

let mybutton = document.querySelector(".myBtt");

window.onscroll = function() {

    let skillsOffsetTop = ourSkills.offsetTop;

    let skillsOuterHeight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        mybutton.style.display = 'block';

        let ourSkillsOptionson = document.querySelectorAll(".skills .skills-box .skills-progress span");

        ourSkillsOptionson.forEach(skillon => {

            skillon.style.width = skillon.dataset.progress;

            skillon.textContent = skillon.dataset.progress;

        });

    } else {

        mybutton.style.display = 'none';

        let ourSkillsOptionsoff = document.querySelectorAll(".skills .skills-box .skills-progress span");

        ourSkillsOptionsoff.forEach(skilloff => {

            skilloff.style.width = '0px';

            skilloff.textContent = "";

        });
    }

};
/*********************************************************************************************************/

let galleryImg = document.querySelectorAll(".gallery img");

galleryImg.forEach(image => {

    //add event to image
    image.addEventListener('click', (e) => {

        // create ovelay
        let overlayGallery = document.createElement("div");

        // add classname to overlaydiv
        overlayGallery.className = 'overlay-gallery';

        // add overlayGallery to body
        document.body.appendChild(overlayGallery);

        // create popup for image
        let popupBox = document.createElement("div");

        // add classname to popupimage
        popupBox.className = 'popup-image';

        if (image.alt !== null) {

            // create span to add image alt
            let heading = document.createElement("h3");

            heading.className = 'heading-gallery';

            heading.textContent = image.alt;

            // add h3 to popupBox
            popupBox.appendChild(heading);

        }


        // create image element
        let popupImage = document.createElement("img");

        popupImage.src = image.src;

        // add popupImage to popupBox
        popupBox.appendChild(popupImage);

        // add popupBox to body
        document.body.appendChild(popupBox);

        // create close button span
        let closespan = document.createElement("span");

        // create text for close span
        closespan.textContent = 'X';

        // add class name to close span
        closespan.className = 'close-span';

        // add span to popupBox
        popupBox.appendChild(closespan);

    });

});

// close popupBox

document.addEventListener('click', (e) => {

    if (e.target.className == 'close-span') {

        e.target.parentNode.remove();

        document.querySelector(".overlay-gallery").remove();
    }

});

/*********************************************************************************************************/

// select all bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullets");

// loop on bullets

moveIntoSection(allBullets);

/*******************************************************************************************************/

const allLinks = document.querySelectorAll(".links a");

// loop on bullets

moveIntoSection(allLinks);

/*******************************************************************************************************/

function moveIntoSection(s) {

    s.forEach(lnk => {

        lnk.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'

            });

        });

    });

}

/*******************************************************************************************************/

function changeClassStatus(e) {

    e.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });

    e.target.classList.add("active");

}

/****************************************************************************************************************/

let resetItem = document.querySelector(".reset-options");

resetItem.onclick = () => {

    if (window.confirm("Are You Sure You Want To Reset Options?")) {
        localStorage.removeItem("remove-bullets");
        localStorage.removeItem("color-option");
        localStorage.removeItem("background-option");
        localStorage.removeItem("clock-option");
        window.location.reload();

    } else {
        localStorage.setItem("remove-bullets");
        localStorage.setItem("color-option");
        localStorage.setItem("background-option");
        localStorage.setItem("clock-option");
    }

}

/***************************************************************************************************************/

let buttonToggle = document.querySelector(".togle-menu");

let linksToggle = document.querySelector(".links");

buttonToggle.onclick = function(e) {

    e.stopPropagation();

    this.classList.toggle("show-arrow");

    linksToggle.classList.toggle("open");

}

document.addEventListener("click", (e) => {

    if (e.target !== buttonToggle && e.target !== linksToggle) {

        if (linksToggle.classList.contains("open")) {

            buttonToggle.classList.toggle("show-arrow");

            linksToggle.classList.toggle("open");

        }

    }


});



linksToggle.addEventListener('click', (e) => {

        e.stopPropagation();

    })
    /************************************************************************************************************/
    // show clock

function showclock() {
    var date = new Date(),
        hours = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        timeZone = "AM",
        showTime = document.querySelector(".clocktime");
    if (hours === 0) {
        hours = 12;
    }
    if (hours > 12) {
        hours = hours - 12;
        timeZone = "PM";
    }
    hours = (hours < 10) ? "0" + hours : hours;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    var realTime = hours + " : " + min + " : " + sec + " " + timeZone;
    showTime.innerHTML = realTime;
    setTimeout(showclock, 1000);
}
showclock();

//change clock status and save it in local

let clockStatus = document.querySelector(".clocktime");

let clockBtn = document.querySelectorAll(".remove-clock span");

clockBtn.forEach(btn => {

    btn.addEventListener("click", (b) => {

        changeClassStatus(b);

        if (b.target.dataset.clock === 'yes') {

            clockStatus.style.display = 'block';

            localStorage.setItem("clock-option", 'block');

        } else {

            clockStatus.style.display = 'none';

            localStorage.setItem("clock-option", 'none');

        }

    });


});

let clockLocal = localStorage.getItem("clock-option");

if (clockLocal !== null) {

    clockBtn.forEach(btn => {

        btn.classList.remove("active");

    });

    if (clockLocal === 'block') {

        clockStatus.style.display = 'block';

        document.querySelector(".remove-clock .yes").classList.add("active");

    } else {

        clockStatus.style.display = 'none';

        document.querySelector(".remove-clock .no").classList.add("active");

    }
}

/****************************************************************************************************************/

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}