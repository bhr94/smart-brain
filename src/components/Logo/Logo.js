import React from 'react';
import Tilt from 'react-tilt';
import "./Logo.css";
import smart_brain from "./smart_brain.png";


const Logo = () =>{
    return(
        <div className = "ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} 
                style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> <img src = {smart_brain} 
                style = {{paddingTop:'10px', paddingLeft:'10px'}}
                alt ="logo"/> </div>
            </Tilt>     
        </div>
    );
}
export default Logo;