import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Oops! The Pokemon you're looking for has escaped!</p>
            <Link to="/" className="back-button">
                Back to Dashboard
            </Link>
        </div>
    );
}

export default NotFound;