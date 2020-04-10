import React, { useState, useEffect } from "react";
import { fetchAddScrap, fetchDeleteScrap } from '../apis/list';
import "../scss/newsItems.scss";
import {Card, Button, Row, Col, Image} from 'react-bootstrap';
import util from "../utils";


export default ({ addScrap, deleteScrap, newsItems }) => {
  return (
    <div id="news-list-body">

      {
          newsItems.length===0 ? (

            <h1>결과가 없습니다.</h1>

          ):(
           
            newsItems.map((item, id) => {
                return (
                <NewsItem
                    key={id}
                    addScrap={addScrap}
                    deleteScrap={deleteScrap}
                    newsItem={item}
                    idx={id}
                ></NewsItem>
                );
            })

          )
      }

   
    </div>
  );
};

const NewsItem = ({ idx, addScrap, deleteScrap, newsItem }) => {

    const onClickScrap=async()=>{
        
        //뉴스 isScrap 을 기준으로 판별
        (newsItem.isScrap ? deleteScrap(newsItem, idx) : addScrap(newsItem, idx))
       
    }

    const showArticle=()=>{
        window.open(newsItem.url, '_blank');
    }


  return (
    <Card className="news-item-temp">
        <Card.Body>
            <Row className="news-item-temp-box1">
                <Col xs={2}>
                    <img className="news-item-thumbnail" src={newsItem.img}></img>
                </Col>
                <Col xs={8}>
                    <Card.Title>{newsItem.title}</Card.Title>
                    <Card.Text>
                        {newsItem.abstract}
                    </Card.Text>
                    <Row>
                        <Button 
                        variant={newsItem.isScrap ? "danger" : "primary"} 
                        onClick={onClickScrap}>
                        {newsItem.isScrap ? '스크랩 삭제' : '스크랩'}
                        </Button>

                        <Card.Link href={newsItem.url}>링크 이동</Card.Link>
                    </Row>
                </Col>

            </Row>
         
        </Card.Body>
    </Card>



    // <div className="news-item">
    //   <div className="news-item-box1">
    //     <img className="news-item-thumbnail" src={newsItem.img}></img>
    //   </div>

    //   <div className="news-item-box2">
    //     <div className="news-item-title">{newsItem.title}</div>
    //     <div className="news-item-subtitle">{newsItem.abstract}</div>
    //   </div>

    //   <div className="news-item-box3"> 
    //       <button onClick={onClickScrap}>{newsItem.isScrap ? 'deletescrap' : 'scrap'}</button>
          
    //       <button onClick={showArticle}>기사 보기</button>
    //   </div>
    //   <div>
    //       <Tags keywords={util.parseKeywords(newsItem.keywords)}></Tags>
    //   </div>
    
    // </div>

  );
};

const Tags=({keywords})=>{
    return(
       keywords.map(keyword=>{
       return <span className="news-item-keyword">{keyword}</span>
       })
    )
}
