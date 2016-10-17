import React, { PureComponent, PropTypes } from 'react';
import { saveSvg, saveSvgAsPng } from 'save-svg-as-png';

import './ExportControls.css';

/**
 * A component that exports charts in a variety of ways
 *
 * @prop {Function} prepareForCsv if provided, data is transformed by this into a flat array of
 *   objects before being used to create a CSV file
 */
export default class ExportControls extends PureComponent {
  static propTypes = {
    chartId: PropTypes.string.isRequired,
    className: PropTypes.string,
    data: PropTypes.any,
    filename: PropTypes.string,
    prepareForCsv: PropTypes.func,
  }

  static defaultProps = {
    prepareForCsv: d => d,
  }

  constructor(props) {
    super(props);

    // bind handlers
    this.onSavePng = this.onSavePng.bind(this);
    this.onSaveSvg = this.onSaveSvg.bind(this);

    this.outputs = [
      { label: 'PNG', handler: this.onSavePng },
      { label: 'SVG', handler: this.onSaveSvg },
    ];
  }

  onSavePng() {
    const { chartId, filename } = this.props;
    const svg = document.getElementById(chartId);
    saveSvgAsPng(svg, `${filename}.png`);
  }

  onSaveSvg() {
    const { chartId, filename } = this.props;
    const svg = document.getElementById(chartId);
    saveSvg(svg, `${filename}.svg`);
  }

  render() {
    return (
      <div className="ExportControls">
        <ul className="list-inline">
          {this.outputs.map(output => (
            <li key={output.label}>
              <button onClick={output.handler}>
                {output.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
