import React, {useState, useEffect} from "react";
import HomeView from "./views/HomeView";
import Introduction from './views/Introduction';
import './sass/Introduction.scss';

const SHOW_INTRO=process.env.REACT_APP_SHOWINTRO==='true';
const INTRO_TIME=4000;

const App = () => {

  const [intro, setIntro]=useState(SHOW_INTRO);

  useEffect(()=>{
    
    console.log(process.env.REACT_APP_SHOWINTRO)

    if(SHOW_INTRO){

      setTimeout(()=>{   
        setIntro(false);
      },INTRO_TIME)

    }
  },[])

  return (
    <>
      {intro ? <Introduction></Introduction> : <HomeView></HomeView>}
     
    </>
   
  );
};

export default App;