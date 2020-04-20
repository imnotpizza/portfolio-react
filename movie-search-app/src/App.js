import React, {useState, useEffect} from "react";
import HomeView from "./views/HomeView";
import Introduction from './views/Introduction';
import './sass/Introduction.scss';

const App = () => {

  const [intro, setIntro]=useState(true);

  useEffect(()=>{
    setTimeout(()=>{

      setIntro(false);
    },4000)
  },[])

  return (
    <>
      {intro ? <Introduction></Introduction> : <HomeView></HomeView>}
     
    </>
   
  );
};

export default App;
