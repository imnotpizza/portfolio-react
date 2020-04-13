import React, {useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default({isOpen, closeModal})=>{

    
   
    return(
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen}
        onHide={closeModal}
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <h4>해당 프로젝트 간단 설명</h4>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>New York Times 기사 검색 API를 활용한 기사 검색 / 스크랩 저장 기능</h5>
            <br></br>
            <h5>기술 스택</h5>
            <br></br>
            <p>API 서버 : Nodejs EC2</p>
            <p>DB : Postgresql RDS</p>
            <p>프론트엔드 : React S3 / Bootstrap</p>
            <p>디자인 : SASS</p>
            <p>git : https://github.com/imnotpizza/portfolio-react</p>
            
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={closeModal}>닫기</Button>
        </Modal.Footer>
        </Modal>
    )
}