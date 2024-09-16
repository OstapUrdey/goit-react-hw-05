// import css from './MoviesPage.module.css';

import { useState } from 'react';

import axios from 'axios';

import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = "dfbdaa10e6641e35135522619deadcb1";

    const fetchMovies = (searchQuery) => {
        if (!searchQuery) return;
        setLoading(true);
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
            .then(response => setMovies(response.data.results))
            .catch(() => setError('Failed to fetch movies'))
            .finally(() => setLoading(false));
    };    

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchMovies(query);
    };

    return (
        <div>
            <h1>Search Movise</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Enter movie title"
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movies && <MovieList movies={movies} />}
        </div>
    )
}