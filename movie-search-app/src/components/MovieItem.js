import React, { Fragment, useState } from "react";
import {Card, Button} from 'react-bootstrap';
import Rating from "@material-ui/lab/Rating";

const MovieItem=({movieItem})=>{

    const [visible, setVisible] = useState(false);


     //소수점 1재짜리 반올림 / 2 
     const getRating=(rating)=>{
         return Math.ceil(rating)/2;
       }
        const clickItem = () => {
         setVisible(!visible);
       }

    return (
       
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
               
                <Button variant="primary">정보 더보기</Button>
            </Card.Body>
      </Card>
  
    )

}


export default MovieItem;