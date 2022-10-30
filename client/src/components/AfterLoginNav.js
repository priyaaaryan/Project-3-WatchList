import React from "react";
import { Link } from 'react-router-dom';

function QueueNav() {
    return (
        <div className="queue-nav">
            <Link to="/favorites" className="orange-button link-text bold-text queue-link">Favorites</Link>
            <Link to="/queue" className="orange-button link-text bold-text queue-link">To-Watch</Link>
        </div>
    )
}

export default QueueNav