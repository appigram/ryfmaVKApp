import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import {MapSwg} from '../../icons/Map';

class MapScreen extends Component {
  render() {
    return(
      <UI.View id="map" activePanel="map">
        <UI.Panel id="map">
          <UI.PanelHeader>Карта</UI.PanelHeader>
          <MapSwg></MapSwg>
        </UI.Panel>
      </UI.View>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(MapScreen);
