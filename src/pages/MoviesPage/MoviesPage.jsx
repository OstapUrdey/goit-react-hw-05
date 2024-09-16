// import css from './MoviesPage.module.css';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import MovieList from '../../components/MovieList/MovieList.jsx';

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const API_KEY = "dfbdaa10e6641e35135522619deadcb1";

    const fetchMovies = (searchQuery) => {
        if (!searchQuery) return;
        setLoading(true);
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
            .then(response => setMovies(response.data.results))
            .catch(() => setError('Failed to fetch movies'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (query) {
            fetchMovies(query);
        }
    }, [query]);

    const handleInputChange = (event) => {
        setSearchParams({ query: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query.trim() === '') return;
        fetchMovies(query);
    };

    return (
        <div>
            <h1>Search Movies</h1>
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
            {movies.length > 0 && <MovieList movies={movies} />}
            {!loading && !error && movies.length === 0 && query && <p>No movies found.</p>}
        </div>
    );
}
