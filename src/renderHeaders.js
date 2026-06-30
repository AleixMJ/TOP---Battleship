// renderHeaders.js
function renderHeaders(wrapper) {

const letterContainer = wrapper.querySelector(".columnLetters");
const numberContainer = wrapper.querySelector(".rowNumbers");

letterContainer.innerHTML = "";
numberContainer.innerHTML = "";

const ColLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

for (let i = 0; i < ColLetters.length; i++) {
    const letter = document.createElement("div");
    letter.textContent = ColLetters[i];

    letterContainer.appendChild(letter);

}

for (let i = 1; i <= 10; i++) {
    const number = document.createElement("div");
    number.textContent = i;
    numberContainer.appendChild(number);

}

}

export default renderHeaders;

