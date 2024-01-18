export class MovieSearch {
    static search(movieselected) {
        const url = `https://www.omdbapi.com/?apikey=4e9a0931&t=${movieselected}`

        return fetch(url)
            .then(data => data.json())
            .then(({ Poster, Title, Plot }) => ({
                Poster,
                Title,
                Plot
            }))
    }
}