import React from 'react';

export default class App extends React.Component {

    clickMe() {
        console.log('Hello');
        this.props.onClick();
    }

  render() {
    return (
    <div className="container-fluid">
        <div className="row">
            <h1>Hello World</h1>
            <a href="#" onClick={this.clickMe.bind(this)}>Test</a>
        </div>
        <div className="row">
            <div className="col">
                1 of 2
            </div>
            <div className="col">
                1 of 2
            </div>
        </div>
    </div>
    );
  }
}
