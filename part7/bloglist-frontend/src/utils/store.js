import { createStore,combineReducers,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'
import loginReducer from '../reducers/loginReducer'
import usersReducer from '../reducers/usersReducer'
const reducer = combineReducers({
  blogs:blogReducer,
  notification:notificationReducer,
  user:loginReducer,
  users:usersReducer,
})
const store = createStore(reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    ))

export default store