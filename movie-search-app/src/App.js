import React, {useState, useEffect} from "react";
import HomeView from "./views/HomeView";
import './scss/introduction.scss';

const App = () => {

  const [intro, setIntro]=useState(true);

  useEffect(()=>{
    setTimeout(()=>{

      setIntro(false);
    },4000)
  },[])

  return (
    <>
      {intro ? <Intruduction></Intruduction> : <HomeView></HomeView>}
    </>
   
  );
};

const Intruduction=()=>{
  return(
    <div id="intro-background">

      <div id="intro-title">
        방문해주셔서 감사합니다
      </div>
      <div id="intro-subtitle">
        <p>NYPost News Search App</p>
        <p>ver : 1.0.0</p>
        <p>제작자 : 고보빈</p>

      </div>
    </div>
  )
}

export default App;
