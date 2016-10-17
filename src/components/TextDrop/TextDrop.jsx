import React from 'react';
import Dropzone from 'react-dropzone';

// Text drop element, uses dropzone
var TextDrop = React.createClass({
    // Read textfile
    readTextFile(file) {
        var reader = new FileReader();
        reader.onloadend = (e) => {
          if (e.target.readyState === FileReader.DONE) {
            var content = reader.result;
            this.setState({content:content})
            this.props.onLoad(content)
          }
        };
        reader.readAsBinaryString(file);
    },

    // Execute on Drop event
    onDrop: function (files) {
        this.readTextFile(files[0]);
    },

    // Render
    render: function () {
      return (
          <div>
            <Dropzone className="dropzone" onDrop={this.onDrop}>
              <div>Drop text file here</div>
            </Dropzone>
          </div>
      );
    }
});

export default TextDrop;
