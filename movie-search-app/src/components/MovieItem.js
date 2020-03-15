import React, { Fragment, useState } from "react";
import {Card, Button} from 'react-bootstrap';
import Rating from "@material-ui/lab/Rating";
import MovieDetail from './MovieDetail';

/**
 * 
 * @param {
 * 
 * 영화 리스트 아이템 담당 컴포넌트
 */
const MovieItem=({movieItem})=>{


    //평점 계산 후 반환 - 소수점 1재짜리 반올림 / 2 
    const getRating=(rating)=>{
        return Math.ceil(rating)/2;
    }
    

    return (
        <>
        <Card style={{ width: '18rem' }}>
            <Card.Img 
            variant="top" 
            height="350rem" 
            src={movieItem.image} 
            />

            <Card.Body>
                <Card.Title>{movieItem.title}</Card.Title>
                <Rating
                  name="read-only"
                  value={getRating(movieItem.userRating)}
                 
                  readOnly
                  />
               
                <MovieDetail
                movieItem={movieItem}
                ></MovieDetail>
            </Card.Body>
      </Card>

       

        </>
  
    )

}


export default MovieItem;