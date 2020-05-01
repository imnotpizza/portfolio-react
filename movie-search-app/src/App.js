import React, {useState, useEffect} from "react";
import HomeView from "./views/HomeView";
import HomeViewContainer from "./containers/HomeViewContainer";
import Introduction from './views/Introduction';
import './sass/Introduction.scss';

const SHOW_INTRO=process.env.REACT_APP_SHOWINTRO==='true';
const INTRO_TIME=4000;

const App = () => {

  const [intro, setIntro]=useState(SHOW_INTRO);

  useEffect(()=>{
  
    if(SHOW_INTRO){

      setTimeout(()=>{   
        setIntro(false);
      },INTRO_TIME)

    }
  },[])

  return (
    <>
      {intro ? <Introduction></Introduction> : <HomeViewContainer></HomeViewContainer>}
     
    </>
   
  );
};

export default App;