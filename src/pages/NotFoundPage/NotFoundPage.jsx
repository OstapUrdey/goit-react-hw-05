// import css from './NotFoundPage.module.css';

import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/">
                <button>Go to Home</button>
            </Link>
        </div>
    );
};