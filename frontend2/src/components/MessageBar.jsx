import React from 'react';
import classNames from 'classnames';

export default class MessageBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '' ,
            selectedNodes: [ 'node1' ] // we preselect node1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.selectedNodes.forEach((nName) => this.props.sendMessage(nName,this.state.message));
        this.setState({message: ''});
    }

    toggleNode(nodeName) {
        const { selectedNodes } = this.state;
        const nodeIndex = selectedNodes.findIndex((n) => (n === nodeName));
        if ( nodeIndex != -1 ) {
            const selectedNodesCopy = selectedNodes.slice();
            selectedNodesCopy.splice(nodeIndex,1);
            this.setState({ selectedNodes: selectedNodesCopy });
        } else {
            this.setState({ selectedNodes: this.state.selectedNodes.concat(nodeName) });
        }
    }

    renderNodeSelect(nodeName) {
        const botClasses = classNames(
            'btn',
            //'btn-default',
            nodeName+'-background-color',
            { active: this.state.selectedNodes.find((n) => (n === nodeName)) }
        );
        const nodeBotElem = (
            <button key={nodeName} type="button" onClick={() => this.toggleNode(nodeName)} className={botClasses}>
                <span className="glyphicon glyphicon-comment" aria-hidden="true"></span> {nodeName}
            </button>
        ); 
        return nodeBotElem; 
    }

    render() {
        const nodeSelectBots = Object.keys(this.props.nodes).map(this.renderNodeSelect.bind(this));

        return (
            <div className="message-bar">
                <div className="col-sm-6">
                    <form onSubmit={this.handleSubmit}>
                        <input className="form-control" type="text" id="inputMsg" placeholder="Type message here"
                            value={this.state.message} onChange={this.handleChange} autoComplete="off"/>
                    </form>
                </div>
                <div className="col-sm-6">
                    <button type="button" onClick={this.handleSubmit} className="btn btn-default">
                        <span className="glyphicon glyphicon-send" aria-hidden="true"></span> Send Message
                    </button>
                    {nodeSelectBots}
                </div>
            </div>
        );
    }
}

