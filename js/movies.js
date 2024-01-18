import { MovieSearch } from "./MovieSearch.js"

export class Movies {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.dataMovies = JSON.parse(localStorage.getItem('@favorite-movies:')) || []
    }

    async add(movieName) {

        try {
            const movieSelected = await MovieSearch.search(movieName)
            console.log(movieSelected);
            if (movieName === undefined) {
                throw new Error('Filme não encontrado, Digite Novamente!')
            }

            this.dataMovies = [movieSelected]
            this.update()

        } catch (error) {
            alert(error.message)
        }
    }
}


export class MoviesView extends Movies {
    constructor(root) {
        super(root)

        this.tmain = document.querySelector('main')
        this.update()
        this.onAdd()
    }

    update() {
        this.removeAllMovieStructure()

        this.dataMovies.forEach(movie => {
            const newMovie = this.createMovie()
            newMovie.querySelector('img').src = movie.Poster
            newMovie.querySelector('h2').textContent = movie.Title
            newMovie.querySelector('p').textContent = movie.Plot
            this.tmain.append(newMovie)
        })
    }

    onAdd() {
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')

            this.add(value)
        }
    }

    createMovie() {
        const movieStructure = document.createElement('movieStructure')

        movieStructure.innerHTML = `<div class="movieStructure">
        <img src="https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
            alt="poster">
        <h2 class="title">Pulp-Function</h2>
        <p class="plot">Hi, this is a test</p>
        </div>`

        return movieStructure
    }


    removeAllMovieStructure() {
        this.tmain.querySelectorAll('.movieStructure')
            .forEach((movie) => {
                movie.remove()
            })
    }
}