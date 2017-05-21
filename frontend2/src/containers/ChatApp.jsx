import { connect } from 'react-redux'
import * as actions from '../actions'
import App from '../components/App.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    nodes: state.nodeClientState.nodes,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { }
}

const AppContainer = connect( mapStateToProps, mapDispatchToProps )(App)

export default AppContainer
