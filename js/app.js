// break down the navbar creation.

const VALUE = window.innerHeight / 2;

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
        navbarItemLink.dataset.nav = `#${section.id}`;
        navbarItem.append(navbarItemLink);
        listFragment.append(navbarItem);
    }
    navbarList.append(listFragment);

}

// detect the active section.
function makeActive() {
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        const navLink = document.querySelector(`[data-nav="#${section.id}"]`);
        if (box.top <= VALUE && box.bottom >= VALUE) {
            //apply active state on current section and corresponding Nav link
            section.classList.add("activeSection");

            navLink.classList.add("activeLink");

        } else {
            //Remove active state from other section and corresponding Nav link
            section.classList.remove("activeSection");

            navLink.classList.remove("activeLink");
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

    let dataNav = event.target.dataset.nav;
    let targetSection = document.querySelector(dataNav);

    targetSection.scrollIntoView({
        behavior: "smooth",
        block:  "center"
    })
})