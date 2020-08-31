import React from 'react';

const Rank = ({name, entries})=>{
    return(
        <div className ="f3 f2-m f1-l fw2 black-90 mv3">
             {`${name} , your current rank is...`}
      <div >
        {entries}
      </div>
        </div>
    );
}
export default Rank;