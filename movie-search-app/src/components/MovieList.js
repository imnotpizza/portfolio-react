import React, { useState, useEffect, useRef } from "react";
import { tempItems } from "../constants";
import MovieItem from './MovieItem';
import MovieDetail from './MovieDetail';
import {Grid, Row, Col} from 'reactstrap';

const MovieList=()=>{
    const [items, setItems]=useState(tempItems);//state 로 적용해야 함
    const [visible, setVisible] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setVisible(true); 
      };
  
      const clsoeModal = () => {
        setVisible(false);
      };
      

    //아이템리스트 반환
    const getItemList=()=>{
        
        return items.map((item, id)=>{
            return(
            
                <Col sm={6} md={4} key={id}>
                    <MovieItem
                    movieItem={item}
                    ></MovieItem>
                </Col>
               
            )
        })
        
    }
      
      return(
          <div>
              <Row className="show-grid" >
                {getItemList()}
              </Row>
              <MovieDetail
              movieItem={items[0]}
              ></MovieDetail>
          </div>
      )
}

export default MovieList;