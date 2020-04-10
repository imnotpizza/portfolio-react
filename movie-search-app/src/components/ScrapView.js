import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { tempItems } from '../constants';

export default ()=>{
    
    const [movieItems, setMovieItems]=useState(tempItems);

    useEffect(()=>{
        //list get api
        
    })

    const deleteScrap=()=>{
        //delete api
        
    }

    

    return(
        <div>
            
            {
                movieItems.map((item, id)=>{
                    <div key={id}>
                        <p>{item.title}</p>
                        <p>{item.pubDate}</p>
                        <p>{item.userRating}</p>
                        <div>
                            <button>스크랩 삭제</button>
                        </div>
                    </div>
                })
            }

           
        </div>
    )
}