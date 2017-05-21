import React from 'react';
import classNames from 'classnames';

export default class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    renderMessageElem(msgObj,key) {
        const strBase64 = msgObj.msg.params;
        const msgId = msgObj.msg.id;
        const msgMethod = msgObj.msg.method;
        const isCommitTx = msgMethod !== 'State.CommitTx';
        const str = atob(strBase64 || '');

        const date = new Date(msgObj.time);
        const node = msgObj.node;
        const msgClasses = classNames('col-md-12',{
            [node+'-blockquote-color']: !isCommitTx,
            'blockquote-reverse': isCommitTx
        });
        return (
            <div key={key} className="row" ref={(msgElem) => (this.messageElem = msgElem)}>
                <blockquote className={msgClasses}>
                    {str}
                    <footer>method {msgMethod} on {date.toLocaleTimeString()}.{date.getMilliseconds()}</footer>
                </blockquote>
            </div>
        );
    }

    componentDidUpdate() {
        if(this.messageElem)
            this.messageElem.scrollIntoView();
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
        const msgElemArr = this.props.messages//.slice().reverse()
            .filter((msg) => msg.node === this.props.nodeName)
            .map(this.renderMessageElem.bind(this));

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
