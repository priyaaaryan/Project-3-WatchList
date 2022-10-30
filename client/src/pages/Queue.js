import React from 'react';
import QueueNav from '../components/AfterLoginNav'

const Queue = () => {
  
    return (
      <>
      <div className="main-container">
        <div className="add-margin">
            <h1 className="title-text">MY <span className="secondary-color bold-text">QUEUE</span></h1>
        </div>
        <QueueNav />
        <div className="results-container add-top-margin">
            <h2 className="center">To-Watch list will be here</h2>
        </div>
      </div>
    </>
    );
  };
  
  export default Queue;