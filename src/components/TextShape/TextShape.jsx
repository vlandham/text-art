import React from 'react';
import * as d3 from "d3";

// Text drop element, uses dropzone
var TextBar = React.createClass({
    // Get state
    getInitialState (){
        return({text:'', data:[1,2,3]});
    },

    // Setup on mount
    componentDidMount () {
        this.setUp();
        // this.update();
    },

    // Bind initial g element
    setUp () {
        console.log('set up!')
        this.g = d3.select(this.root).append("g");
    },

    // Update on new props
    componentWillReceiveProps (props){
        console.log("new shape props! ", props.text)
        this.processText(props.text);
        this.update();
    },
    // Bind data using D3
    update() {
        // Set scales
        var xMax = d3.max(this.data,(d) => {return d.size});
        var xScale = d3.scaleLinear().domain([0, xMax]).range([0, this.props.width]);
        var yScale = d3.scaleBand().domain(this.data.map((d,i) => {return i})).range([0, this.props.width]);

        // Data join, returns updating elements
        var bars = this.g.selectAll('.bar').data(this.data);

        // Entering element, merged with updating elements
        bars.enter().append("rect")
                    .attr('class', 'bar')
                    .attr("x", 0)
                    .attr('width', 0)
                    .attr("y", (d, i) => { return yScale(i); })
                    .attr('height', yScale.bandwidth())
                    // Merge in updating elements
                    .merge(bars)
                    .transition()
                    .delay((d,i) => {return i * this.props.duration / this.data.length})
                    .duration(this.props.duration)
                    .attr("width", (d, i) => { return xScale(d.size)})
                    .attr("x", 0)
                    .attr("y", (d, i) => { return yScale(i); })
                    .attr('height', yScale.bandwidth());

        bars.exit().remove();

    },
    // Render
    processText(text) {
        var splitText = text.split('\n');
        var data = splitText.map(function(d) {
            return {text:d, size:d.length}
        });
        this.data = data;
    },
    render: function () {
      return (
          <div>
              <svg width={500}
                   height={500}
                   ref={(node) => { this.root = node; }} />
          </div>
      );
    }
});

export default TextBar;
