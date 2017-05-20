import { combineReducers } from 'redux'
import nodeClientState from './nodeClientState'

const babbleApp = combineReducers({ nodeClientState });

export default babbleApp
