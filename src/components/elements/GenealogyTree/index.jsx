import OrgChart from '@balkangraph/orgchart.js'
import React, {Component} from 'react'

export default class Chart extends Component {
  constructor(props) {
    super(props)
    this.divRef = React.createRef()
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    this.chart = new OrgChart(this.divRef.current, {
      align: OrgChart.ORIENTATION,
      template: 'diva',
      enableSearch: false,
      scaleInitial: OrgChart.match.boundary,
      mouseScrool: OrgChart.action.ctrlZoom,
      nodeMouseClick: OrgChart.action.none,
      nodeBinding: {
        field_0: 'name',
        field_1: 'accountNumber',
        img_0: 'avatar',
      },
      linkBinding: {
        link_field_0: 'count',
      },
      nodes: this.props.nodes,
      editForm: {
        buttons: {
          edit: null,
          share: null,
          pdf: null,
          remove: null,
        },
        generateElementsFromFields: false,
        elements: [
          {type: 'textbox', label: 'Full Name', binding: 'name'},
          {type: 'textbox', label: 'Account Number', binding: 'accountNumber'},
        ],
      },
    })
  }

  render() {
    return <div id='binary-tree' ref={this.divRef}></div>
  }
}
