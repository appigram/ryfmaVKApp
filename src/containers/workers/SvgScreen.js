import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import {push} from 'react-router-redux';
import {MapSwg} from '../../icons/Map';

class SvgScreen extends Component {
  render() {
    return(
      <UI.View id="map" activePanel="map">
        <UI.Panel id="map">
          <UI.PanelHeader>Карта</UI.PanelHeader>
        </UI.Panel>
      </UI.View>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(SvgScreen);
