import {Navbar, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import React, {useState, useCallback} from 'react'
import { fetch_movielist } from '../apis/list'

const MovieSearch=()=>{
    const [query, setQuery] = useState("");

    const onChange = useCallback(e => {
          setQuery(e.target.value);
        },[query]
      );

    //api 통해 데이터 가져온 뒤 state 에 저장
    const onClickSearchBtn = useCallback(async e => {
      
        const response = await fetch_movielist(query); //객체 넣어야 함

    
    });

    return(
        <div>
      
            <Form inline>
                <FormControl
                 type="text" 
                 placeholder="찾을 영화 제목을 검색하세요" 
                 className=" mr-sm-2" 
                 onChange={onChange}
                 />
                <Button onClick={onClickSearchBtn}>검색하기</Button>
            </Form>
        </div>
    )
}

export default MovieSearch;