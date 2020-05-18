import React from 'react';
import '../sass/Introduction.scss';
import { version } from '../constants'

export default () => {
  return (
    <div id="intro-background">

      <div id="intro-title">
        방문해주셔서 감사합니다
          </div>
      <div id="intro-subtitle">
        <p>NYPost News Search App</p>
        <p>ver : {version}</p>
        <p>제작자 : 고보빈</p>
      </div>
      <div id="intro-update">
        <p>업데이트 목록</p>
        <p>-redux, redux-thunk 적용</p>
        <p>-스크롤 시 데이터 로딩 기능 추가</p>
      </div>
    </div>
  )
}