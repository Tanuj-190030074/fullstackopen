import blogService from "../services/blogs";
import {setNotification} from './notificationReducer'
import { useHistory } from "react-router";
const reducer=(state=[],action)=>{
    switch(action.type){
        case 'CREATE':{
            return [...state,action.data]
        }
        case 'INIT_BLOGS':{
            return action.data.sort((a,b)=>b.likes-a.likes)
        }
        case 'LIKE':{
            const updatedone=action.data
            return state.map(x=>x.id!==updatedone.id?x:updatedone).sort((a,b)=>b.likes-a.likes)
        }
        case 'REMOVE':{
            const id=action.data
            return state.filter(x=>x.id!==id)
        }
        case 'COMMENT':{
            const id=action.data.id
            const toupdatedone=state.find(x=>x.id===id)
            const updatedone={...toupdatedone,comments:action.data.comments}
            return state.map(x=>x.id!==id?x:updatedone)
        }
        default:return state
    }
}

export const createBlog=(obj)=>{
    return async dispatch=>{
        try{
        const newblog=await blogService.createblog(obj)
        dispatch({
            type:'CREATE',
            data: newblog
        })
        dispatch(setNotification({text:`a new blog ${obj.title} by ${obj.author} added`,type:"success"},5))
       }
       catch(exception){
        dispatch(setNotification({text:`${exception.response.data.error}`,type:"danger"},5))
       }
    }
}

export const removeItem=(id,history)=>{
    return async dispatch=>{
        try{
        await blogService.deleteblog(id)
        dispatch({
            type:'REMOVE',
            data:id
        })
        dispatch(setNotification({text:`deleted blog successfully`,type:'success'},5))
        history.push("/blogs")
     }
        catch(exception){
            dispatch(setNotification({text:`${exception.message}`,type:'danger'},5))
        }
    }
}

export const updateLike=(id,obj)=>{
    return async dispatch=>{
        try{
        const updatedone=await blogService.updateblog(id,obj)
        dispatch({
            type:'LIKE',
            data:updatedone
        })
        dispatch(setNotification({text:`${obj.title} updated successfully`,type:'success'},5))
    }
        catch(exception){
            dispatch(setNotification({text:`${exception.response.data.error}`,type:'danger'},5))
        }
    }
}

export const initializeBlogs=()=>{
    return async dispatch=>{
        const blogs=await blogService.getAll()
        dispatch({
            type:'INIT_BLOGS',
            data:blogs
        })
    }
}

export const updatecomment=(id,obj,comment) => {
    return async dispatch=>{
        try{
            const updatedone=await blogService.updateblog(id,{...obj,comments:obj.comments.concat([comment])})
            dispatch({
                type:'COMMENT',
                data:updatedone
            })
        }
        catch(exception){
            dispatch(setNotification({text:`${exception.message}`,type:'danger'},5))
        }
    }
}

export default reducer