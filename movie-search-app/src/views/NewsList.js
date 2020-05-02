import React, { useState, useEffect } from "react";
import { fetchAddScrap, fetchDeleteScrap } from '../apis/list';
import "../sass/NewsList.scss";
import {Card, Button, Row, Col, Image, Badge} from 'react-bootstrap';
import BgText from './BgText';
import util from "../utils";


export default ({ addScrap, deleteScrap, newsItems, scrapItems }) => {
  return (
    <div id="news-list-body">

      {
        
          newsItems.map((item, id) => {
              return (
              <NewsItem
                  key={id}
                  addScrap={addScrap}
                  deleteScrap={deleteScrap}
                  newsItems={newsItems}
                  scrapItems={scrapItems}
                  newsItem={item}
                  idx={id}
              ></NewsItem>
              );
          })

        }
   
    </div>
  );
};

const NewsItem = ({ idx, addScrap, deleteScrap, newsItem, newsItems, scrapItems }) => {

    const onClickScrap=async()=>{
        
        //뉴스 isScrap 을 기준으로 판별
        (newsItem.isScrap ? 
          deleteScrap(newsItem, newsItems, scrapItems) : 
          addScrap(newsItem, newsItems, scrapItems, idx)
        )
       
    }

    const showArticle=()=>{
        window.open(newsItem.url, '_blank');
    }

    const parsePubdate=()=>{
      const date=new Date(newsItem.pubdate);

      const y=date.getFullYear();
      const m=date.getMonth()+1;
      const d=date.getDate();
      const h=date.getHours();
      const M=date.getMinutes();
      const s=date.getSeconds();

      return `${y}년 ${m}월 ${d}일`
      
    }

    const parseKeywords=()=>{
      return newsItem.keywords.split('|').map((news, id)=>{
        return (
          <span className="news-item-keywords" key={id}>
            <Badge variant="primary">{news}</Badge>
          </span>
     
        )
      })
    }


  return (
    <Card className="news-item">
        <Card.Body>
            <Row className="news-item-container">
                <Col xs={2}>
                    <img className="news-item-thumbnail" src={newsItem.img}></img>
                </Col>
                <Col xs={8}>
                    <p className="news-item-title">{newsItem.title}</p>
                    <Card.Text>
                        <p className="news-item-abstract">{newsItem.abstract}</p>
                    </Card.Text>
                    <Card.Text>
                        <p className="news-item-pubdate">작성시간 : {parsePubdate()}</p>
                    </Card.Text>
                    <a className="news-item-link" href={newsItem.url} target="_blank">링크 이동</a>
                </Col>

            </Row>
            <div class="news-item-keyword-title">키워드</div>
            <Row>
              <Col xs={10}>
              {parseKeywords()}
              </Col>
              <Col xs={2}>
      
                <Button 
                variant={newsItem.isScrap ? "danger" : "primary"} 
                onClick={onClickScrap}>
                {newsItem.isScrap ? '스크랩 삭제' : '스크랩'}
                </Button>

              </Col>
            </Row>
         
        </Card.Body>
    </Card>

  );
};

const Tags=({keywords})=>{
    return(
       keywords.map(keyword=>{
       return <span className="news-item-keyword">{keyword}</span>
       })
    )
}
