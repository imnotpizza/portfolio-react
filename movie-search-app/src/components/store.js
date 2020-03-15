const { createStore } =require('redux');

const reducer=(prevState, action)=>{
    switch(action.type){
        case 'CHANGE_COMP_A':
            return {
                compA: action.data,
                compB: 'abc',
                compC: null,
            }
    }
};

const store=createStore(reducer, {

    compA: 'a',
    compB: 'abc',
    compC: null,

});

console.log(store.getState());

//action : 상태를 변경하는 행위를 구현
const changeCompA=(data)=>{
    return {
        type: "CHANGE_COMP_A",
        data,
    }
}
//dispatch : 
store.dispatch(changeCompA('dispatched'));

//reducer