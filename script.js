const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let numSelections = 0;
let selection = [null, null];
let pauseSelection = false;
const showClass = "showColor"
const showPermanent = 'matched';
function handleCardClick(event) {
  if (pauseSelection) return
  console.dir(event.target);
  const isShow = event.target.classList.contains(showClass);
  const isPermanent = event.target.classList.contains(showPermanent);
  if (numSelections === 0 && !isShow && !isPermanent) {
    numSelections++;
    console.log(numSelections)
    selection[0] = event.target;
    selection[0].style.backgroundColor = selection[0].classList[0];
    selection[0].classList.add(showClass);

  } else if (numSelections === 1 && event.target !== selection[0]) {
    pauseSelection = true;
    console.log(numSelections);
    selection[1] = event.target;
    selection[1].style.backgroundColor = selection[1].classList[0];
    if (selection[0].classList.contains(selection[1].classList[0])) {
      // colors match
      selection[0].classList.add(showPermanent);
      selection[1].classList.add(showPermanent);
      selection = [null, null]
      numSelections = 0;
      pauseSelection = false;
    } else {
      let id = setInterval(function () {
        flipCards(selection, id)
      }, 1000);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

function flipCards(cards, intervalId) {
  for (card of cards) {
    console.log(card.classList, intervalId)
    card.style.backgroundColor = ""
    card.classList.remove(showClass);
  }
  selection = [null, null];
  numSelections = 0;
  pauseSelection = false;
  clearInterval(intervalId);
}
