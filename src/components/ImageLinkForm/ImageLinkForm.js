import React from 'react';
import './ImageLinkForm.css';



const ImageLinkForm = ({inputOnChange, onSubmit})=>{
    return(
        <div>
            <p className = "f6 f2-m f1-l fw2 white-90 mv3">
                {"This smart brain will detet faces in you pictures. Give it a try "}
            </p>
            <div className="bg-light-red mw7 center pa4 br2-ns ba b--black-10 form">
                <div className = "cf">
                    <input onChange = {inputOnChange} className = "f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                     placeholder="Paste the image URL here..." type="text"/>
                    <button onClick = {onSubmit} className = "f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"> 
                    Detect </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;