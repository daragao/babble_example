import { connect } from 'react-redux'
import * as actions from '../actions'
import MessageBar from '../components/MessageBar.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    nodes: state.nodeClientState.nodes,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(actions.refresh()),
    sendMessage: (node,msg) => dispatch(actions.sendSubmitTx(node,msg)) //should send message to node!
  }
}

const MessageBarContainer = connect( mapStateToProps, mapDispatchToProps )(MessageBar)

export default MessageBarContainer

