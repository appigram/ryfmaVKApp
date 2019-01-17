import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import {connect} from 'react-redux';
import WorkersItem from './WorkersItem'
import RequestsItem from './RequestsItem'
import AdvsScreen from '../workers/AdvsScreen'

import Icon24Note from '@vkontakte/icons/dist/24/note';
import Icon24Users from '@vkontakte/icons/dist/24/users';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Notification from '@vkontakte/icons/dist/24/notification';


class DispetcherEpic extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeStory: 'workers',
        activePanel: 'discover'
      };
    this.onStoryChange = this.onStoryChange.bind(this);
  }

  onStoryChange (e) {
    this.setState({ activeStory: e.currentTarget.dataset.story })
  }
  render() {
    return (
      <UI.Epic id='epic' activeStory={this.state.activeStory} tabbar={
        <UI.Tabbar>
          <UI.TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'workers'}
            data-story="workers"
          ><Icon24Users/></UI.TabbarItem>
          <UI.TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'requests'}
            data-story="requests"
          ><Icon24Note/></UI.TabbarItem>
          <UI.TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'discover'}
            data-story="discover"
          ><Icon24Place/></UI.TabbarItem>
          <UI.TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'advs'}
            data-story="advs"
          ><Icon24Notification/></UI.TabbarItem>
        </UI.Tabbar>
      }>
      <WorkersItem id="workers"/>
      <AdvsScreen id= "advs"/>
      <RequestsItem id="requests"/>
      <UI.View id="discover" activePanel={this.state.activePanel}>
        <UI.Panel id="discover">
          <UI.PanelHeader>Карта</UI.PanelHeader>
        </UI.Panel>
        <UI.Panel id="test">
          <UI.PanelHeader>cxvxcv</UI.PanelHeader>
          <UI.Button>фывфывфыв</UI.Button>
        </UI.Panel>
      </UI.View>
      </UI.Epic>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(DispetcherEpic);
