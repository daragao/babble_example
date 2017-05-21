import React from 'react';
import classNames from 'classnames';

export default class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    messageElem(msgObj,key) {
    const str = msgObj.msg;
    const date = new Date(msgObj.time);
    const node = msgObj.node;
    const msgClasses = classNames('col-md-12',node+'-blockquote-color',{
    'blockquote-reverse': (this.props.nodeName === node)
    });
    return (
    <div key={key} className="row">
        <blockquote className={msgClasses}>
            {str}
            <footer>from {node} on {date.toLocaleTimeString()}.{date.getMilliseconds()}</footer>
        </blockquote>
    </div>
    );
    }

  render() {
    const outerStyle = {
        height: '100%',
        window: '100%',
        overflow: 'hidden'
    };
    const panelStyle = {
        height: 'calc(100% - 20px)',
        overflow: 'hidden'
    };
    const panelBodyStyle = {
        height: 'calc(100% - 37px)',
        overflow: 'auto'
    };

    // slice() makes sure that the original array is not mutated
    const msgElemArr = this.props.messages.slice().reverse().map(this.messageElem.bind(this));

    return (
    <div className="container-fluid" style={outerStyle}>
        <div className="panel panel-default" style={panelStyle}>
            <div className="panel-heading">
                <h3 className="panel-title">
                    <span className="glyphicon glyphicon-comment" 
                        style={({ 'paddingRight': '5px' })} aria-hidden="true"></span>
                    {this.props.nodeName}
                </h3>
            </div>
            <div className="panel-body small-scrollbar" style={panelBodyStyle}>
                {msgElemArr}
            </div>
        </div>
    </div>
    );
  }
}
