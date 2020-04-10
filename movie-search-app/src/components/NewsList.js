import React, { useState, useEffect } from "react";

export default ({addScrap, deleteScrap, newsItems})=>{

    

    return(
        <div>
            {newsItems.map((item, id)=>{
                <NewsItem
                addScrap={addScrap}
                deleteScrap={deleteScrap}
                newsItem={item}
                ></NewsItem>
            })}
        </div>
    )

}


const NewsItem=({addScrap, deleteScrap, newsItem})=>{
    
    const onClickScrap=()=>{

    }
    
    return(
        <div>
            <div>{item.abs}</div>
            <div>{item.title}</div>
            <div>{item.pubdate}</div>
            <div>{item.img}</div>
            <div>{item.url}</div>
            <button onClick={onClickScrap}>scrap</button>
        </div>
    )
}