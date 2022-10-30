import React from "react";
import QueueNav from '../components/AfterLoginNav'

function Favorites() {

 
        
    return (
        <>
        <div className="main-container">
            <div className="add-margin">
                <h1 className="title-text">MY <span className="secondary-color bold-text">QUEUE</span></h1>
            </div>
            <QueueNav />
            <div className="results-container add-top-margin">
                <h3 className="center">Favorites list will be here</h3>
            </div>
        </div>
        </>
    )
}

export default Favorites;