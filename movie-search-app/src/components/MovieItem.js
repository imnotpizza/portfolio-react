import React, { Fragment, useState } from "react";
import {Card, Button} from 'react-bootstrap';
import Rating from "@material-ui/lab/Rating";
import MovieDetail from './MovieDetail';
import ReactHtmlParser from 'react-html-parser';
import '../scss/style.scss';

/**
 * 
 * @param {
 * 
 * 영화 리스트 아이템 담당 컴포넌트
 */
const MovieItem=({movieItem})=>{


    //평점 계산 후 반환 - 소수점 1재짜리 반올림 / 2 
    const getRating=(rating)=>{
        
        return rating/2;
    }
    

    return (
        <>
        <div className="item-card">
           
            <Card style={{ width: '18rem' }}>
                <Card.Img 
                variant="top" 
                height="350rem" 
                src={movieItem.image} 
                />
            
            <div className="item-card-body">

                <Card.Body>
                    <Card.Title>{ReactHtmlParser(movieItem.title)}</Card.Title>
                    <Rating
                    name="read-only"
                    value={movieItem.userRating/2}
                    precision={0.5}
                    readOnly
                    />
                
                    <MovieDetail
                    movieItem={movieItem}
                    ></MovieDetail>
                </Card.Body>

            </div>
            </Card>
         
        </div>
     

       

        </>
  
    )

}


export default MovieItem;