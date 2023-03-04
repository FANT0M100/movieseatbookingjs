const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//declare movie ticket price
let ticketPrice = +movieSelect.value;

populateUI();

//update count and total
function updateSelectedCount(){
    let selectedSeats = document.querySelectorAll('.row .seat.selected');

    //localstorage
    let seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat)
    });
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    let selectedSeatsCount = selectedSeats.length;
    count.textContent = selectedSeatsCount;
    total.textContent = (selectedSeatsCount * ticketPrice) + '$';
};

//save selected movie index and value
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviPrice', moviePrice);
};

//get data from localtorage and populate UI
function populateUI() {
    let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((el, i) => {
            if(selectedSeats.indexOf(i) > -1){
                el.classList.add('selected')
            }
        });
    };

    let selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    };

    let selectedMoviPrice = localStorage.getItem('selectedMoviPrice');
    if(selectedMoviPrice !== null) {
        ticketPrice = selectedMoviPrice;
    };
};

//max selected seats 
function maxSelected(){
    let selectedSeats = document.querySelectorAll('.row .seat.selected');
    return selectedSeats.length >= 5;
};

//movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

//seat click event
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        if(!maxSelected()) {
            e.target.classList.toggle('selected');
            updateSelectedCount();
        }else if(maxSelected() && e.target.classList.toggle('selected')) {
            e.target.classList.toggle('selected');
            updateSelectedCount();
        };
    };
});

//initial
updateSelectedCount();