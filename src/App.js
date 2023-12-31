import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';
import Footer from "./Footer";

const API_URL = 'http://www.omdbapi.com?apikey=43ca138d'

const movie = {
        "Title": "Batman Begins",
        "Year": "2005",
        "imdbID": "tt0372784",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Batman')
    }, []);

    return (
        <div className="app">
          <h1>MovieHub</h1>  

          <div className="search">
            <input placeholder="Search for movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
          </div>

            {movies?.length > 0 
              ? (
                <div className="container">
                   {movies.map((movie) => (
                      <MovieCard movie={movie} />
                    ))}
                </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                        </div>
                )
            }
            <Footer />
        </div>
    );
}

export default App;