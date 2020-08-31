import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, boxes})=>{
    return(
        <div className = "mw5 mw6-ns center pt4">
             <div className='absolute mt2'>
                <img id="inputImage" alt = '' src = {imageUrl}  width = "500px" height = "auto"/>
                {
                    boxes.map((box)=> {
                       return <div className = "bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}/>
                    })
                }
                
                </div>
                </div>
    );
}
export default FaceRecognition;