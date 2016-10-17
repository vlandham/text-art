import React, { Component, PropTypes } from 'react';
import d3 from '../../d3';
import addComputedProps from 'react-computed-props';

import './TextLine.css';

function computeProps(props) {
  const { width, height, data } = props;

  const x1Extent = d3.extent(data, (d) => d.x1);
  const x2Extent = d3.extent(data, (d) => d.x2);

  const xScale = d3.scaleLinear()
    .domain([Math.min(x1Extent[0],x2Extent[0]), Math.max(x1Extent[1], x2Extent[1])])
    .range([0, width]);

  const y1Extent = d3.extent(data, (d) => d.y1);
  const y2Extent = d3.extent(data, (d) => d.y2);

  const yScale = d3.scaleLinear()
    .domain([Math.min(y1Extent[0],y2Extent[0]), Math.max(y1Extent[1], y2Extent[1])])
    .range([height, 0]);

  const margin = {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20,
  }

  return {
    xScale,
    yScale,
    margin
  };
}

class TextLine extends Component {

  static propTypes = {
    id: PropTypes.string,
    color: PropTypes.string,
    data: PropTypes.array,
    margin: PropTypes.object,
    height: PropTypes.number,
    width: PropTypes.number,
  }

  static defaultProps = {
    width: 800,
    height: 800,
    color: 'tomato',
  }

  /**
   * When the react component mounts, setup the d3 vis
   */
  componentDidMount() {
    this.setup();
  }

  /**
   * When the react component updates, update the d3 vis
   */
  componentDidUpdate() {
    this.update();
  }


  setup() {

    const { margin } = this.props;

    const g = d3.select(this.root).append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    this.lines = g.append("g").attr("id", "vis_points")

    this.update();
  }

  update() {
    const { data, color, xScale, yScale } = this.props;

    console.log(data)

    const lines = this.lines.selectAll(".line")
      .data(data, (d) => d.sentence);

    const linesE = lines.enter()
      .append("path")
      .attr("class", "line")
      .attr("stroke", color)
      .attr('stroke-opacity', 0.0)
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round")
      .attr("d", (d) => `M${xScale(d.x1)},${yScale(d.y1)}L${xScale(d.x2)},${yScale(d.y2)}`);

    linesE.transition()
      .duration(500)
      .delay((d,i) => i * 20)
      .attr('stroke-opacity', 1.0)

    this.lines.exit().remove();
  }

  render() {
    const { width, height, margin, id } = this.props;
    return (
      <div className='TextLine'>
        <svg
          id={id}
          ref={(node) => { this.root = node; }}
          height={height + margin.top + margin.bottom}
          width={width + margin.left + margin.right}
        />
      </div>
    );
  }
}

export default addComputedProps(computeProps)(TextLine);
