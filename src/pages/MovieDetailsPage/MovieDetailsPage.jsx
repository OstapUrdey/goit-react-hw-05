// import css from './MovieDetailsPage.module.css';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    const locationRef = useRef(location.state?.from || '/movies'); 

    const API_KEY = "dfbdaa10e6641e35135522619deadcb1";
    const URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

    const fetchMovieDetails = useCallback(() => {
        setLoading(true);
        axios.get(URL)
            .then(response => setMovie(response.data))
            .catch(() => setError('Failed to fetch movie details'))
            .finally(() => setLoading(false));
    }, [URL]);    

    useEffect(() => {
        fetchMovieDetails();
    }, [fetchMovieDetails]);

    const handleGoBack = () => {
        navigate(locationRef.current);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {movie && (
                <>
                    <button onClick={handleGoBack}>Go back</button>
                    <div>
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <div>
                            <h2>{movie.title}</h2>
                            <p>User Score: {movie.vote_average * 10}%</p>
                            <h3>Overview</h3>
                            <p>{movie.overview}</p>
                            <h3>Genres</h3>
                            <p>{movie.genres.map(genre => genre.name).join(", ")}</p>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h3>Additional Information</h3>
                        <ul>
                            <li>
                                <Link to="cast">Cast</Link>
                            </li>
                            <li>
                                <Link to="reviews">Reviews</Link>
                            </li>
                        </ul>
                    </div>
                    <Outlet />
                </>
            )}
        </div>
    );
}
