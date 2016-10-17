import React from 'react';
import './App.css';
import TextDrop from './components/TextDrop/TextDrop';

var App = React.createClass({
    loadText(content) {
        this.setState({content:content})
    },
    render() {
        return (
            <div className="App">
                <nav>Text-Art</nav>
                <TextDrop onLoad={this.loadText}/>
                <div className="textWrapper">
                    {this.state !== null ? this.state.content : ''}
                </div>
            </div>
        );
    }
});

export default App;
