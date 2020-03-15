import React, {useState, useEffect} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Image, Row, Col } from 'react-bootstrap'
import Rating from "@material-ui/lab/Rating";

/**
 * 
 * @param {
 * 영화 상세보기 담당 컴포넌트
 * } param0 
 */
const MovieDetail=({movieItem})=>{

    const [modal, setModal]=useState(false);

    //평점 계산
    const getRating = rating => {
        return Math.ceil(rating) / 2;

    };

    //배우 목록 반환
    const getActorsList=(text)=>{
        let _arr=text.split('|');
        _arr.pop();
        
        return _arr.join(', ');
    };

    const openModal=()=>{
        setModal(true);
    };

    const closeModal=()=>{
        setModal(false);
    };


    return(
        <div>
        <Button color="danger" onClick={openModal}>상세보기</Button>
        <Modal isOpen={modal} size="lg">
            
          <ModalBody>
            <Row>
                <h3>{movieItem.title}</h3>
            </Row>
            <Row>
                <Col xs={6}>
                <Image src={movieItem.image} width="200" rounded></Image>
                </Col>
                <Col xs={6}>
                    <Rating
                    name="read-only"
                    value={getRating(movieItem.userRating)}
                    readOnly
                    />
                    <h5>평점 : {movieItem.userRating}</h5>
                    <h5>개봉년도 : {movieItem.pubDate}</h5>
                    <h5>평점 : {getActorsList(movieItem.director)}</h5>
                    <h5>배우 : {getActorsList(movieItem.actor)}</h5>
                    <Button
                    variant="success"
                    onClick={()=>{window.open(movieItem.link)}}
                    >네이버 영화로 이동</Button>
                </Col>
            </Row>

            
           
           
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={closeModal}>확인</Button>
          </ModalFooter>
        </Modal>
      </div>
    )

}

export default MovieDetail;