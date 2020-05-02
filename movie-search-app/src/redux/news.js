import { fetchNewsList, fetchScrapList, fetchAddScrap, fetchDeleteScrap } from '../apis/list'

//액션 타입 정의
const GET_NEWSITEMS = 'news/GET_NEWSITEMS';//뉴스목록 추가
const GET_SCRAPITEMS = 'news/GET_SCRAPITEMS';//스크랩 목록 추가


const SET_QUERY = 'news/SET_QUERY';//query 입력후 반영

const SET_ISLOADING = 'news/SET_ISLOADING';//로딩 플래그
const SET_ISMORELOADING = 'news/SET_ISMORELOADING';//추가 데이터 로딩 플래그
const SET_ISFIRST = 'news/SET_ISFIRST';//검색 첫 수행 여부 플래그
const SET_TABMODE = 'news/SET_TABMODE';//검색/스크랩 탭 플래그
const SET_NEWSITEMS = 'news/SET_NEWSITEMS';
const SET_SCRAPITEMS = 'news/SET_SCRAPITEMS';

//스크랩 목록 호출
const FETCH_SCRAPITEMS = 'news/FETCH_SCRAPITEMS';
const FETCH_SCRAPITEMS_SUCCESS = 'news/FETCH_SCRAPITEMS_SUCCESS';
//검색 결과 호출
const FETCH_NEWSITEMS = 'news/FETCH_NEWSITEMS';
const FETCH_NEWSITEMS_SUCCESS = 'news/FETCH_NEWSITEMS_SUCCESS';
//검색결과 추가호출
const FETCH_MORENEWS = 'news/FETCH_MORENEWS';
const FETCH_MORENEWS_SUCCESS = 'news/FETCH_MORENEWS_SUCCESS';
//스크랩 추가
const FETCH_ADDSCRAP = 'news/FETCH_ADDSCRAP';
const FETCH_ADDSCRAP_SUCCESS = 'news/FETCH_ADDSCRAP_SUCCESS';
//스크랩 제거
const FETCH_DELETESCRAP = 'news/FETCH_DELETESCRAP';
const FETCH_DELETESCRAP_SUCCESS = 'news/FETCH_DELETESCRAP_SUCCESS';








//액션 생성
export const setNewsItems = (newsItems) => ({
    type: SET_NEWSITEMS,
    newsItems,
})

export const setScrapItems = (scrapItems) => ({
    type: SET_SCRAPITEMS,
    scrapItems,
})


export const setQuery = (query) => ({
    type: SET_QUERY,
    query,
})

export const setIsMoreLoading = (bool) => ({
    type: SET_ISMORELOADING,
    bool,
})

export const setIsFirst = (bool) => ({
    type: SET_ISFIRST,
    bool,
})

export const setTabMode = (bool) => ({
    type: SET_TABMODE,
    bool,
})

export const setIsLoading = (bool) => ({
    type: SET_ISLOADING,
    bool,
})

//뉴스 검색결과 호출
export const fetchScrapItems = () => async dispatch => {
    dispatch({ type: FETCH_SCRAPITEMS });
    try {
        setIsLoading(true);

        const response = await fetchScrapList();

        console.log(response)
        dispatch({
            type: FETCH_SCRAPITEMS_SUCCESS,
            payload: response,
        });

    } catch (e) {
        alert("failed");
        console.log(e);
    } finally {
        setIsLoading(false);
    }
}

export const fetchNewsItems=(query, scrapItems)=>async dispatch=>{
    dispatch({type: FETCH_NEWSITEMS, payload:[]});

    try{
        setIsLoading(true);
        setIsFirst(false);

        const response=await fetchNewsList(query, 0, scrapItems);

        dispatch({
            type: FETCH_NEWSITEMS_SUCCESS,
            payload: response,
        })

    } catch (e) {
        alert("failed");
        console.log(e);
    } finally {
        setIsLoading(false);
    }
}



const initialState = {
    newsItems: [],
    scrapItems: [],

    query: '',
    isLoading: false,
    isMoreLoading: false,
    isFirst: true,
    tabMode: true,
}

//리듀서
function news(state = initialState, action) {
    switch (action.type) {

        case SET_NEWSITEMS:
            return {
                ...state,
                newsItems: action.newsItems  //newsItems 추가
            }

        case SET_SCRAPITEMS:
            return {
                ...state,
                scrapItems: action.scrapItems
            }

        case SET_QUERY:
            return {
                ...state,
                query: action.query,

            }

        case SET_ISMORELOADING:

            return {
                ...state,
                isMoreLoading: action.bool,

            }

        case SET_ISFIRST:

            return {
                ...state,
                isFirst: action.bool,

            }

        case SET_TABMODE:

            return {
                ...state,
                tabMode: action.bool,

            }

        case SET_ISLOADING:

            return {
                ...state,
                isLoading: action.bool,

            }



        case FETCH_SCRAPITEMS:

            return {
                ...state,
                scrapItems: action.payload
            }

        case FETCH_SCRAPITEMS_SUCCESS:
            console.log('action', action)
            return {
                ...state,
                scrapItems: action.payload
            }

        case FETCH_NEWSITEMS:

            return {
                ...state,
                newsItems: action.payload
            }

        case FETCH_NEWSITEMS_SUCCESS:
            console.log('action', action.payload)
            return {
                ...state,
                newsItems: action.payload
            }


        default: return state;


    }
}

export default news;

