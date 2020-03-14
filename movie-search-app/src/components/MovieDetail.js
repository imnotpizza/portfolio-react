import React, {useState, useEffect} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
        <Button color="danger" onClick={openModal}>팝업창임</Button>
        <Modal isOpen={modal}>
          <ModalHeader >Modal title</ModalHeader>
          <ModalBody>
            <h1>Title</h1>
            <h3>제목 : {movieItem.title}</h3>
            <img src={movieItem.image} alt="img"></img>
            <h5>평점 : {movieItem.userRating}</h5>
            <h5>개봉년도 : {movieItem.userRating}</h5>
            <h5>감독 : {movieItem.userRating}</h5>
            <h5>배우 : {movieItem.userRating}</h5>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={closeModal}>확인</Button>
          </ModalFooter>
        </Modal>
      </div>
    )

}

export default MovieDetail;