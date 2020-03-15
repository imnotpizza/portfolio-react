import React, {useRef, useState, useCallback} from 'react';
import MovieList from './components/MovieList';
import MovieSearch from './components/MovieSearch';
import { fetch_movielist } from './apis/list'
import {Navbar, Form, InputGroup, FormControl, Button} from 'react-bootstrap';

const App=()=>{

  const [query, setQuery] = useState("");
  const [movieItems, setMovieItems]=useState([]);

    const onChange = useCallback(e => {
          setQuery(e.target.value);
        },[query]
      );

    //api 통해 데이터 가져온 뒤 state 에 저장
    const onClickSearchBtn = useCallback(async e => {

        if(!query){ alert("검색어를 입력해주세요"); return; }

        console.log(query)
        const response = await fetch_movielist(query); //객체 넣어야 함

       setMovieItems(response.data);
    });

  return (
    <>

      <Navbar className="bg-dark justify-content-between">
          
          <Form inline>
              <FormControl
              type="text" 
              placeholder="찾을 영화 제목을 검색하세요" 
              className=" mr-sm-2" 
              onChange={onChange}
              />
              <Button onClick={onClickSearchBtn}>검색하기</Button>
          </Form>
      </Navbar>

      <br></br>
      <br></br>
      <MovieList
      items={movieItems}
      ></MovieList>
     
    </>
  )
}

export default App;