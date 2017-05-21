import React from 'react';
import ChatWindow from '../containers/ChatWindow.jsx';
import MessageBar from '../containers/MessageBar.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {

      const topRowStyle = { height: '50px' };
      const bottomRowStyle = { height: '50px' };
      const middleRowStyle = { 
          height: `calc(100% - (${topRowStyle.height} + ${bottomRowStyle.height}))` 
      };
      const chatWindowStyle = {
          height: '50%'
      };

      //only supports 4 windows
      const chatWindows = Object.keys(this.props.nodes).map((nodeName) => (
            <div key={'chat-window-'+nodeName} className="col-md-6" style={chatWindowStyle}>
                <ChatWindow nodeName={nodeName} />
            </div>
      ));

    return (
    <div className="container-fluid" style={({ height: '100vh' })} >
        <div className="row" style={topRowStyle} >
            <h3>babble example</h3>
        </div>
        <div className="row" style={middleRowStyle}>{chatWindows}</div>
        <div className="row" style={bottomRowStyle}><MessageBar /></div>
    </div>
    );
  }
}
