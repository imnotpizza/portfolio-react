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
    </div>
  )
}