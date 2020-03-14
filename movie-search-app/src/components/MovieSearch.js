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
    const onClick = useCallback(async e => {
        const response = await fetch_movielist(query); //객체 넣어야 함
    });

    return(
        <Navbar className="bg-light justify-content-between">
      
            <Form inline>
                <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                <Button type="submit">Submit</Button>
            </Form>
        </Navbar>
    )
}

export default MovieSearch;