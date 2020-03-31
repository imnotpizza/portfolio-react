import React, {useState, useEffect} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Image, Row, Col } from 'react-bootstrap'
import Rating from "@material-ui/lab/Rating";
import ReactHtmlParser from 'react-html-parser';
import '../scss/style.scss';

/**
 * 
 * @param {
 * 영화 상세보기 담당 컴포넌트
 * } param0 
 */
const MovieDetail=({movieItem})=>{

    const [isOpen, setIsOpen]=useState(false);

    //평점 계산
    const getRating = rating => {
        return rating/2;

    };

    //배우 목록 반환
    const getActorsList=(text)=>{
        if(!text){
            return '등록 안됨'
        }else{

            let _arr=text.split('|');
            _arr.pop();
            
            return _arr.join(', ');
        }
    };

    const openModal=()=>{
        setIsOpen(true);
    };

    const closeModal=()=>{
        setIsOpen(false);
    };

    useEffect(()=>{
       
    })


    return(
        <div>
        <Button color="primary" onClick={openModal}>상세보기</Button>
        <Modal isOpen={isOpen} size="lg">
            
          <ModalBody>
            <div className="detail-title">
                <h3 >{ReactHtmlParser(movieItem.title)}</h3>
            </div>
            
            <Row>
                <Col xs={6}>
                    <Image src={movieItem.image} width="200" rounded></Image>
                </Col>
                <Col xs={6}>
                    
                    <div className="detail-text">

                        <p className="detail-rating">
                        <Rating
                        name="read-only"
                        value={movieItem.userRating/2}
                        precision={0.5}
                        readOnly
                        />
                        {movieItem.userRating/2}
                    
                        </p> 
                       
                        <p>개봉년도 : {movieItem.pubDate}</p>
                        <p>감독 : {getActorsList(movieItem.director)}</p>
                        <p>배우 : {getActorsList(movieItem.actor)}</p>
                    </div>
                    
                  
                </Col>
            </Row>
          
          </ModalBody>
          <ModalFooter>

            <Button
            onClick={()=>{window.open(movieItem.link)}}
            >네이버 영화로 이동</Button>

            <Button color="danger" onClick={closeModal}>닫기</Button>

          </ModalFooter>
        </Modal>
      </div>
    )

}

export default MovieDetail;