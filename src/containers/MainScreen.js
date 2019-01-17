import React, {Component} from 'react';
import { Panel, Spinner, Button, PanelHeader, View, Group, ListItem, Avatar, Root } from '@vkontakte/vkui';
import {connect} from 'react-redux';
import UserRequest from './UserRequest'
import WorkerEpic from './workers/WorkerEpic'
import DispetcherEpic from './dispetcher/DispetcherEpic'

import * as requestActions from '../store/userRequest/actions'
import * as requestSelectors from '../store/userRequest/reducer'

class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
			activePanel: 'mainscreen',
      fetchedUser: null
		}
  }

  componentWillMount() {
    this.props.dispatch(requestActions.fetchLocations())
  }

  preRender() {
    return (
      <View id="spinner" activePanel="spinner">
        <Panel id="spinner">
          <PanelHeader>Spinner</PanelHeader>
          <div style={{ height: 100 }}>
            <Spinner />
          </div>
        </Panel>
      </View>
    );
  }
  render() {
    if (!this.props.locations) return this.preRender();
    			console.log(this.state.fetchedUser);
    return (
      <Root activeView={this.state.activePanel}>
        <View id="mainscreen" activePanel="mainscreen">
          <Panel id='mainscreen'>
            <PanelHeader ></PanelHeader>
            <Button size="xl" level="2" onClick={this.showRequest.bind(this)}>
              Посетитель
            </Button>
            <Button size="xl" level="2" onClick={this.showWorkerEpic.bind(this)}>
              Работник
            </Button>
            <Button size="xl" level="2" onClick={this.showDispetcherEpic.bind(this)}>
              Диспетчер
            </Button>
          </Panel>
        </View>
        <UserRequest id='request'/>
        <WorkerEpic id='workerepic'/>
        <DispetcherEpic id='dispetcherepic'/>
      </Root>
    );
  }

  showRequest() {
    this.setState({activePanel:'request'})
  }

  showWorkerEpic() {
    this.setState({activePanel:'workerepic'})
  }

  showDispetcherEpic() {
    this.setState({activePanel:'dispetcherepic'})
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps");
  return {
    locations: requestSelectors.getLocations(state)
  };
}

export default connect(mapStateToProps)(MainScreen);
