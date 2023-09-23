
const movieCard = document.querySelector('.movie-card')
const movieImg = document.querySelector('.background')
const movieTitle = document.querySelector('.movie-title')
const movieGenre = document.querySelector('.movie-genre')
const moviePlot = document.querySelector('.movie-plot')
const movieRunTime = document.querySelector('.movie-runtime')
const movieRating = document.querySelector('.movie-rating')

const input = document.querySelector('.movie-input')
const error = document.querySelector(`.error-text`)
const searchBtn = document.querySelector('.search-btn')


const checkPlot = (response) => {
	if (response.Plot == 'N/A') {
		moviePlot.textContent = 'Plot: No plot found in database'
	} else {
		moviePlot.textContent = `Plot: ${response.Plot}`
	}
}

const checkPoster = (response) => {
	if (response.Poster =='N/A') {
        movieImg.textContent = `Poster Not Found in database :(`
		movieImg.style.color = 'white'
		movieImg.style.backgroundImage = ``;
	} else {
		movieImg.textContent = ''
		movieImg.style.backgroundImage = `url('${response.Poster}')`;
	}
}

const createMovieCard = (response) => {

	if (response.Error == 'Movie not found!') {
		error.style.display = "flex";
		error.textContent = "That movie does not Exist!";
		movieCard.style.display = 'none'
	}   else if (input.value == '') {
		error.style.display = 'flex'
		error.textContent = `Type in movie name to perform search`
		movieCard.style.display = 'none'
	} else {
		error.style.display = "none";
		movieCard.classList.add("expand");
		movieCard.style.display = 'flex';
        
		checkPoster(response)
		movieTitle.textContent = `Title: ${response.Title} (${response.Year})`
		movieGenre.textContent = `Genre: ${response.Genre}`
		movieRunTime.textContent = `Runtime: ${response.Runtime}`
        checkPlot(response)
		console.log(response);
	
		movieRating.innerHTML = `<h3>Rating: ${response.imdbRating}/10 <img src="/images/MV5BODc4MTA3NjkzNl5BMl5BcG5nXkFtZTgwMDg0MzQ2OTE@._V1_.png" alt="logo IMBD"></h3> <a href="https://www.imdb.com/title/${response.imdbID}/" target=_blank>Learn more</a>`}

       setTimeout(() => {
		movieCard.classList.remove("expand");
	   }, 2000)
	
}


const dataFetch = () => {

	const search = input.value
	
	fetch(`https://www.omdbapi.com/?t=${search}&apikey=ab9febaa&plot=short&page=1`)
    .then(response => response.json())
    .then(response => {
    createMovieCard(response)} )
    .catch(err => console.error(err))
	;
}

searchBtn.addEventListener('click', dataFetch)

input.addEventListener("keypress", () => {
	if (event.key === "Enter") {
	  dataFetch()
	}
})
