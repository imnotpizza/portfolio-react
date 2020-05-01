
//액션 타입 정의
const GET_NEWSITEMS = 'news/GET_NEWSITEMS';//뉴스목록 추가
const GET_SCRAPLIST = 'news/GET_SCRAPLIST';//스크랩 목록 추가

const START_LOADING = 'news/START_LOADING';//로딩 시작
const END_LOADING = 'news/END_LOADING';//로딩 끝

const SET_QUERY='news/SET_QUERY';//query 입력후 반영

const SET_MORELOADING='news/SET_MORELOADING';
const SET_ISFIRST='news/SET_ISFIRST';
const SET_TABMODE='news/SET_TABMODE';



//액션 생성
export const getNewsItems = (newsList) => ({
    type: GET_NEWSITEMS,
    newsList,
})

export const startLoading = () => ({
    type: START_LOADING
})

export const endLoading = () => ({
    type: END_LOADING
})

export const setQuery = (query) => ({
    type: SET_QUERY,
    query,
})

export const setMoreLoading = (bool) => ({
    type: SET_MORELOADING,
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


const initialState = {
    newsItems: [],
    scrapList: [],
    query: '',
    isLoading2: true,
    isMoreLoading: false,
    isFirst: true,
    tabMode: true,
}

//리듀서
function news(state = initialState, action) {
    switch (action.type) {
        case GET_NEWSITEMS:
            console.log("get")
            return {
                ...state,
                newsItems: action.newsItems  //newsItems 추가
            }
        case START_LOADING:
            console.log('on', state.isLoading2)
            return {
                ...state,
                isLoading2: true,
            }
        case END_LOADING:
            console.log('off', state.isLoading2)
            return {
                ...state,
                isLoading2: false,
            }
        case SET_QUERY:
            return{
                ...state,
                query: action.query,
                
            }

        case SET_MORELOADING:
          
            return{
                ...state,
                moreLoading: action.bool,
                
            }

        case SET_ISFIRST:
           
            return{
                ...state,
                isFirst: action.bool,
                
            }

        case SET_TABMODE:
          
            return{
                ...state,
                tabMode: action.bool,
                
            }
        default: return state;
    }
}

export default news;

