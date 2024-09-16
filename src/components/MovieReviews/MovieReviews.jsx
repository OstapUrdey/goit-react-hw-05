// import css from './MovieReviews.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieReviews() {
    const {movieId} = useParams();
    const [reviews, setReviews] = useState([]);

    const API_KEY = "dfbdaa10e6641e35135522619deadcb1";
    const URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`;

    useEffect(() => {
        const fetchReviews = async () =>{
            const response = await axios.get(URL);
            setReviews(response.data.results);
        };
        fetchReviews();
    }, [movieId, URL]);

    return (
        <ul>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <li key={review.id}>
                        <h4>{review.author}</h4>
                        <p>{review.author}</p>
                    </li>
                ))
            ) : (
                <p>No reviews available</p>
            )}
        </ul>
    );
};