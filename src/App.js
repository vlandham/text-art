import React, { Component } from 'react';
import { sentenceLengths, findPositions } from './utils/text';
import './App.css';
import TextDrop from './components/TextDrop/TextDrop';
import TextLine from './components/TextLine/TextLine';
import TextShape from './components/TextShape/TextShape';
import ExportControls from './components/ExportControls/ExportControls';

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
                <TextLine id="text-line" data={convertedData} />
                <ExportControls chartId="text-line" filename="text-line"/>
                <TextShape
                  id="text-shape"
                  duration={1000}
                  width={600}
                  height={600}
                  text={this.state !== null ? this.state.content : ''}
                />
                <ExportControls chartId="text-shape" filename="text-shape"/>
            </div>
        );
    }
};

export default App;
