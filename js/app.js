// break down the navbar creation.

const VALUE = 300;

const navbarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
const listFragment = new DocumentFragment();

//functions

// create dynamic navbar with minimum repaintings and reflows.
function createNavbar(){
    for (const section of sections) {
        const navbarItem = document.createElement("li");
        const navbarItemLink = document.createElement("a");
        let data = section.dataset.nav;
        navbarItemLink.innerText = data;
        navbarItemLink.href = `#${section.id}`;
        navbarItem.append(navbarItemLink);
        listFragment.append(navbarItem);
    }
    navbarList.append(listFragment);

}

// detect the active section.
function makeActive() {
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        //Find a value that works best, but 150 seems to be a good start.
        if (box.top <= VALUE && box.bottom >= VALUE) {
            //apply active state on current section and corresponding Nav link
            section.classList.add("activeSection");

        } else {
            //Remove active state from other section and corresponding Nav link
            section.classList.remove("activeSection");
        }
    }
}

createNavbar();

//event listeners

// call makeActive upon scrolling
document.addEventListener('scroll', makeActive);

// event listener for click to scroll into view();
navbarList.addEventListener('click', (event) => {
    event.preventDefault();

    let hrefValue = event.target.getAttribute('href');
    let targetSection = document.querySelector(hrefValue);

    targetSection.scrollIntoView({
        behavior: "smooth",
        block:  "center"
    })
})