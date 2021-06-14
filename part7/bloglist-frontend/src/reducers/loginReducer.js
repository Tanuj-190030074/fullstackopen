import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const loginReducer =(state=null, action)=>{
    switch(action.type){
        case 'INIT_USER':return action.data
        case 'LOGIN':return action.data
        case 'LOGOUT':return action.data
        default:return state
    }
}

export const initializeuser=()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      return{
          type:'INIT_USER',
          data:user
      }
    }
    return{
        type:'INIT_USER',
        data:null
    }
}

export const loginuser=(username, password,history)=>{
    return async dispatch=>{
    try {
        const user = await loginService.login({
          username, password,
        })
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        ) 
        blogService.setToken(user.token)
        dispatch({
            type:'LOGIN',
            data:user
        })
        history.push("/")
      } catch (exception) {
        dispatch(setNotification({text:"wrong username or password",type:"danger"},5))
      }
    }
}

export const logoutuser=()=>{
    return async dispatch=>{
        window.localStorage.removeItem("loggedBlogappUser")
        dispatch({type:'LOGOUT',data:null})
    }
}

export default loginReducer