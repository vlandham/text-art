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
        this.state = {content: ""};

        this.loadText = this.loadText.bind(this);
    }
    loadText(content) {
        this.setState({content:content})
    }
    render() {
      const { content } = this.state;
      let data = [];
      let convertedData = [];
      if(content) {
          data = sentenceLengths(content);
          convertedData = findPositions(data)
      }

        return (
            <div className="App">
                <nav>Text-Art</nav>
                <div className="container">
                    <TextDrop onLoad={this.loadText}/>
                    <TextShape
                        id="text-shape"
                        duration={1000}
                        width={(window.innerWidth * .8)/2}
                        height={window.innerHeight/2}
                        text={this.state !== null ? this.state.content : ''}/>
                    <TextLine className="TextLineWrapper"
                        id="text-line"
                        width={(window.innerWidth * .8)/2}
                        height={window.innerHeight/2}
                        data={convertedData} />
                    <div className="exports">
                      <div className="left">
                      <ExportControls chartId="text-shape" filename="text-shape"/>
                      </div>
                      <div className="right">
                      <ExportControls chartId="text-line" filename="text-line"/>
                      </div>
                    </div>

                </div>
            </div>
        );
    }
};

export default App;
