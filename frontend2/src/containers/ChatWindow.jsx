import { connect } from 'react-redux'
import * as actions from '../actions'
import ChatWindow from '../components/ChatWindow.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.nodeClientState.messages,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { }
}

const ChatWindowContainer = connect( mapStateToProps, mapDispatchToProps )(ChatWindow)

export default ChatWindowContainer
