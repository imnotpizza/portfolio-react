import { fetchNewsList, fetchScrapList, fetchAddScrap, fetchDeleteScrap } from '../apis/list'


const SET_QUERY = 'news/SET_QUERY';//query 입력후 반영

const SET_ISLOADING = 'news/SET_ISLOADING';//로딩 플래그
const SET_ISMORELOADING = 'news/SET_ISMORELOADING';//추가 데이터 로딩 플래그
const SET_ISFIRST = 'news/SET_ISFIRST';//검색 첫 수행 여부 플래그
const SET_TABMODE = 'news/SET_TABMODE';//검색/스크랩 탭 플래그
const SET_PAGENUM = 'news/SET_PAGENUM';



//스크랩 목록 호출
const FETCH_SCRAPITEMS = 'news/FETCH_SCRAPITEMS';
const FETCH_SCRAPITEMS_SUCCESS = 'news/FETCH_SCRAPITEMS_SUCCESS';

//검색 결과 호출
const FETCH_NEWSITEMS = 'news/FETCH_NEWSITEMS';
const FETCH_NEWSITEMS_SUCCESS = 'news/FETCH_NEWSITEMS_SUCCESS';








//액션 생성
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

export const setPageNum = (num) => ({
    type: SET_PAGENUM,
    num,
})


//스크랩 목록 호출
export const fetchScrapItems = () => async dispatch => {
    dispatch({ type: FETCH_SCRAPITEMS });
    try {
        dispatch({ type: SET_ISLOADING, bool: true });//로딩 ui 활성화

        const response = await fetchScrapList();

        dispatch({
            type: FETCH_SCRAPITEMS_SUCCESS,
            payload: response,
        });

    } catch (e) {
        alert("스크랩 목록을 호출하는 도중 문제가 발생했습니다.");
        dispatch({
            type: FETCH_SCRAPITEMS_SUCCESS,
            payload: [],
        });
     
    } finally {

        dispatch({ type: SET_ISLOADING, bool: false });//로딩 ui 비활성화
    }
}

//뉴스 검색결과 호출 
export const fetchNewsItems = (query, scrapItems) => async dispatch => {
    dispatch({ type: FETCH_NEWSITEMS, payload: [] });

    try {
        dispatch({ type: SET_ISLOADING, bool: true });//로딩 ui 활성화
        dispatch({ type: SET_ISFIRST, bool: false });//첫 검색 플래그 비활성황

        const response = await fetchNewsList(query, 0, scrapItems);

        dispatch({
            type: FETCH_NEWSITEMS_SUCCESS,
            payload: response,
        })
        dispatch({ type: SET_PAGENUM, num: 0 });

    } catch (e) {
        alert("검색 도중 문제가 발생했습니다.");

    } finally {
        dispatch({ type: SET_ISLOADING, bool: false });//로딩 ui 비활성화
    }
}

//뉴스 검색결과 추가호출
export const fetchMoreNews = (query, pageNum, scrapItems, newsItems) => async dispatch => {

    try {
        dispatch({ type: SET_ISMORELOADING, bool: true });
        const moreNewsItems = await fetchNewsList(query, pageNum + 1, scrapItems);

        dispatch({
            type: FETCH_NEWSITEMS_SUCCESS,
            payload: [
                ...newsItems,
                ...moreNewsItems,
            ]
        })

        dispatch({ type: SET_PAGENUM, num: pageNum + 1 });



    } catch (e) {
        alert("API 호출 도중 문제가 발생했습니다.")

    } finally {
        dispatch({ type: SET_ISMORELOADING, bool: false });
    }

}
//스크랩 추가
export const addScrap = (newsItem, newsItems, scrapItems, idx) => dispatch => {

    if (window.confirm("해당 기사를 스크랩 목록에 저장하시겠습니까?") != 0) {
        fetchAddScrap(newsItem)
            .then(response => {
                //뉴스검색 : isScrap 교체 

                //검색 데이터 수정
                newsItem.isScrap = true;

                //뉴스검색목록에 새 데이터 반영
                dispatch({
                    type: FETCH_NEWSITEMS_SUCCESS,
                    payload: [
                        ...newsItems.slice(0, idx),
                        newsItem,
                        ...newsItems.slice(idx + 1)
                    ]
                })

                //스크랩 데이터 추가
                dispatch({
                    type: FETCH_SCRAPITEMS_SUCCESS,
                    payload: [
                        ...scrapItems,
                        newsItem
                    ]
                })


            })
            .catch(e => {
                alert("스크랩 저장 중 문제가 발생했습니다.")
       
            })
    }

}
/**
   * 뉴스에서 클릭시 -> 뉴스 : idx, 스크랩 : indexof
   * 스크랩에서 클릭시 -> 뉴스 : 뉴스:indexof, 스크랩: id
   */

  //뉴스 항목 스크랩 삭제 -news 객체, newsItem의 index
export const deleteScrap = (newsItem, newsItems, scrapItems) => dispatch => {

    if (window.confirm("해당 기사를 스크랩 목록에서 삭제하시겠습니까?") != 0) {

    fetchDeleteScrap(newsItem.id)
        .then(response => {
            let scrapIdx = 0;
            let searchIdx = 0;

            //삭제하려는 기사의 id값 획득-스크랩
            for (let i = 0; i < scrapItems.length; i++) {

                if (scrapItems[i].id === newsItem.id) {
                    scrapIdx = i;
                    break;
                }
            }

            //삭제하려는 기사의 id값 획득-뉴스기사
            for (let i = 0; i < newsItems.length; i++) {

                if (newsItems[i].id === newsItem.id) {
                    searchIdx = i;
                    break;
                }
            }

            //검색 데이터 수정
            if (searchIdx > -1) {
                newsItem.isScrap = false;

                dispatch({
                    type: FETCH_NEWSITEMS_SUCCESS,
                    payload:[
                        ...newsItems.slice(0, searchIdx),
                        newsItem,
                        ...newsItems.slice(searchIdx + 1)
                    ]
                })

            }

            //스크랩 : 해당 항목 삭제
            const _scrapItems=scrapItems.filter((news, newsId)=>{
                return newsId!==scrapIdx;
            })

            dispatch({
                type: FETCH_SCRAPITEMS_SUCCESS,
                payload:_scrapItems,
            })
          
        })
        .catch(e => {
            alert("스크랩 삭제 중 문제가 발생했습니다.")
  
        })
    }
}


//스크랩 삭제

const initialState = {
    newsItems: [],
    scrapItems: [],

    query: '',
    isLoading: false,
    isMoreLoading: false,
    isFirst: true,
    tabMode: true,
    pageNum: 0,
}

//리듀서
function news(state = initialState, action) {
    console.log(action.type)
    switch (action.type) {

        case SET_QUERY: return {
            ...state,
            query: action.query,

        }

        case SET_ISMORELOADING: return {
            ...state,
            isMoreLoading: action.bool,

        }

        case SET_ISFIRST: return {
            ...state,
            isFirst: action.bool,

        }

        case SET_TABMODE: return {
            ...state,
            tabMode: action.bool,

        }

        case SET_ISLOADING: return {
            ...state,
            isLoading: action.bool,
        }

        case SET_PAGENUM:
            return {
                ...state,
                pageNum: action.num,
            }



        case FETCH_SCRAPITEMS:

            return {
                ...state,
                scrapItems: action.payload
            }

        case FETCH_SCRAPITEMS_SUCCESS:
        
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
           
            return {
                ...state,
                newsItems: action.payload
            }



        default: return state;


    }
}

export default news;

