import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import autoBind from 'react-autobind';
import _ from 'lodash';

import * as requestActions from '../../store/createRequest/actions'
import * as requestSelectors from '../../store/createRequest/reducer'

class AdvsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
			activePanel: 'advs'
		}
  }

  componentDidMount() {
    console.log("componentWillMount");
    this.props.dispatch(requestActions.fetchAvds())
  }

  preRender() {
    return (
      <UI.View id="spinner" activePanel="spinner">
        <UI.Panel id="spinner">
          <UI.PanelHeader>Loading...</UI.PanelHeader>
          <div style={{ height: 100 }}>
            <UI.Spinner />
          </div>
        </UI.Panel>
      </UI.View>
    );
  }

  render() {
    if (!this.props.avds) return this.preRender();
    return (
      <UI.Root activeView={this.state.activePanel}>
        <UI.View id="advs" activePanel="advs">
          <UI.Panel id='advs'>
            <UI.PanelHeader noShadow>Объявления</UI.PanelHeader>
              <UI.List>
                {_.sortBy(this.props.avds, 'create_date').map(avd => <UI.Cell expandable multiline description={avd.create_date}>{avd.remark}</UI.Cell>)}
              </UI.List>
          </UI.Panel>
        </UI.View>
      </UI.Root>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps");
  console.log(state);
  return {
    avds: requestSelectors.getAvds(state)
  };
}

export default connect(mapStateToProps)(AdvsScreen);
