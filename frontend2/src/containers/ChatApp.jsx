import { connect } from 'react-redux'
import { refresh } from '../actions'
import App from '../components/App.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    //active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(refresh())
  }
}

const AppContainer = connect( mapStateToProps, mapDispatchToProps )(App)

export default AppContainer
