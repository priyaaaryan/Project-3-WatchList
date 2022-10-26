import React, { Component } from 'react';
import Auth from '../utils/auth';

class MovieList extends Component {
    trailer() {
        console.log('this is connected')
        const url = "https://www.themoviedb.org/movie/" + this.props.movie.id 
        window.location.href = url
        console.log(window.location.href)
    }

    watchlistAlert=()=>{
      alert('Added to Watchlist');
    }

    favoritesAlert=()=>{
      alert('my favtourites movie');
    }

    render() {
        return<table key={this.props.movie.id}>
        <tbody>
            <tr className="movie-container text-center">
                <td>
                <img className="image" alt="poster" src={this.props.movie.poster_src}/>
                </td>
                <td className="title-description">
                <h3>{this.props.movie.title}</h3>
                <p className="description">{this.props.movie.overview}</p>
                </td>
                {Auth.loggedIn() ? (
                    <div className="dropdown">
                    <button className="btn text-light queue-button dropdown-toggle" type="button" data-toggle="dropdown">Save to List
                    <span className="caret"></span></button>
                    <ul className="dropdown-menu queue-button">
                    <li  className="queue-button text-light" onClick={this.watchlistAlert}>Add to Watchlist!</li>
                    <li  className="queue-button text-light" onClick={this.favoritesAlert}>Add to My Favorites!</li>
                    </ul>
                    <input className="btn queue-button text-light" type="playTrailer" onClick={this.trailer.bind(this)} value="More Info"/>
                  </div>
              ) : (
                <input className="btn queue-button text-light" type="playTrailer" onClick={this.trailer.bind(this)} value="More Info"/>
              )}
                </tr>
        </tbody>
    </table>
    }
}

export default MovieList

