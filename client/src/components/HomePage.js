import React from "react";
import "../image/HomePageStyle.css"


function HomePage(){
    return(
        <div class="hero2">
            <div class="homeDiv ">
                <div class="container styleCont">
                    <h1 class="display-7 title"><span class="effect">Unlimited movies, TV shows, and more. </span></h1>
                    <p class="words"><strong>Ready to watch? Create Your Account with Us</strong></p>
                    <div class="btnContainer">
                        <a class="searchButton" href="/SearchBooks" role="button">Find Your Movies</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage;