const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// fetches localStorage data to update the UI
populateUI();

let ticketPrice = +movieSelect.value; // + converted str to int type

// watches 'click' event to select available seats
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
})

// watches 'change' event on select element to update the price
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
})

function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); // map over selectedSeats and return an array of indexes of selected seats 
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // converts array -> string before saving it to the local storage
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// saves the movie data which is taken by select-option elements
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // get the stringified data and convert it back to an array before using
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) { // checks whether the indexes of all seats exist inside the selectedSeats array 
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

updateSelectedCount();