const filterReducer=(state='',action)=>{
    switch(action.type){
        case 'SETFILTER':
            return action.data
        default:return state
    }
}

export const setFilter=(data)=>{
    return {
        type: 'SETFILTER',
        data: data
    }
}

export default filterReducer