import React, { Component } from 'react';
import { sentenceLengths, findPositions } from './utils/text';
import './App.css';
import TextDrop from './components/TextDrop/TextDrop';
import TextLine from './components/TextLine/TextLine';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {content: "hello. world."};

    this.loadText = this.loadText.bind(this);
  }

    loadText(content) {
        this.setState({content:content})
    }

    render() {
      const { content } = this.state;

      const data = sentenceLengths(content);
      const convertedData = findPositions(data)

        return (
            <div className="App">
                <nav>Text-Art</nav>
                <TextDrop onLoad={this.loadText}/>
                <div className="textWrapper">
                    {this.state !== null ? this.state.content : ''}
                </div>
                <TextLine data={convertedData} />
            </div>
        );
    }
};

export default App;
