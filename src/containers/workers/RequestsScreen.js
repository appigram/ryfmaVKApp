
  import React, {Component} from 'react';
  import * as UI from '@vkontakte/vkui';
  import {connect} from 'react-redux';
  import autoBind from 'react-autobind';
  import {push} from 'react-router-redux';
  import Icon24Back from '@vkontakte/icons/dist/24/back';
  import Icon24Search from '@vkontakte/icons/dist/24/search';

  import * as requestActions from '../../store/createRequest/actions'
  import * as requestSelectors from '../../store/createRequest/reducer'
  import * as userActions from '../../store/userRequest/actions'
  import * as userSelectors from '../../store/userRequest/reducer'

class RequestsScreen extends Component {

    constructor(props) {
      super(props);
      autoBind(this);
      this.state = {
  			activePanel: "requests",
        post: "",
        activeTempRequest: null,
        categoryJob: null,
        jobType: null
  		}
    }

    componentWillMount() {
      this.props.dispatch(requestActions.fetchTmpRequests());
      this.props.dispatch(requestActions.fetchCategoryOfJobs());
      this.props.dispatch(requestActions.fetchTypeJobs());
      this.props.dispatch(userActions.fetchLocations());
    }

    changeID(e) {
      this.setState({workerID: e.target.value});
    }

    changePost(e) {
      this.setState({post: e.target.value});
    }

    changeCategory(e) {
      this.setState({categoryJob: e.target.value});
    }

    changeJobType(e) {
      this.setState({jobType: e.target.value});
    }

    showTempRequest(request, categoryJobss) {
      this.setState({
        categoryJob:"",
        activePanel: "showtemprequest",
        activeTempRequest: request
      });
      this.forceUpdate();
    }

    acceptRequest() {
      this.props.dispatch(requestActions.moderateRequest(this.state.activeTempRequest.id, this.state.activeTempRequest.remark, this.state.activeTempRequest.creator_vk_id, "305", this.state.jobType, this.state.categoryJob, ""))
    }

    declineRequest() {
      console.log("declineRequest");
      console.log(this.state.activeTempRequest.id);
      this.props.dispatch(requestActions.deleteRequest(this.state.activeTempRequest.id))
    }

    preRender() {
      console.log(this.props.locations);
      return (
        <UI.View id="spinner" activePanel="spinner">
          <UI.Panel id="spinner">
            <UI.PanelHeader>Spinner</UI.PanelHeader>
            <div style={{ height: 100 }}>
              <UI.Spinner />
            </div>
          </UI.Panel>
        </UI.View>
      );
    }

    render() {
      console.log("render");
      console.log(this.state.activeTempRequest);
      if (!this.props.tempRequests || !this.props.jobType || !this.props.locations || !this.props.jobPriority) return this.preRender();
      return (
        <UI.Root activeView="requests">
          <UI.View id="requests" activePanel={this.state.activePanel}>
            <UI.Panel id='requests'>
              <UI.PanelHeader noShadow>Заявки</UI.PanelHeader>
                <UI.List>
                  {this.props.tempRequests.map(request => <UI.Cell expandable description={request.job_type} onClick={this.showTempRequest.bind(this, request, this.props.categoryJobs)}>{request.remark}</UI.Cell>)}
                </UI.List>
            </UI.Panel>
            <UI.Panel id="showtemprequest">
              <UI.PanelHeader>Заявка</UI.PanelHeader>
              <UI.FormLayout>
                <UI.Input top="ID гостя" value={this.state.activeTempRequest == null ? "" : this.state.activeTempRequest.creator_vk_id}/>
                <UI.Input top="Описание заявки" value={this.state.activeTempRequest == null ? "" : this.state.activeTempRequest.remark}/>
                <UI.Select top="Номер зала" value={this.state.activeTempRequest == null ? "" : this.state.activeTempRequest.location}>
                  {this.props.locations.map(location => <option value={location.id}> {location.id} - {location.name} </option>)}
                </UI.Select>
                <UI.Select top="Категория работ" placeholder="Выберите категорию работ" onChange={this.changeCategory}>
                  {this.props.jobType.map(category => <option value={category.id}> {category.name} </option>)}
                </UI.Select>
                <UI.Select top="Срочность исполнения" placeholder="Установите приоритет" onChange={this.changeJobType}>
                  {this.props.jobPriority.map(category => <option value={category.id}> {category.name} </option>)}
                </UI.Select>
                <UI.Div style={{display: 'flex'}}>
                  <UI.Button size="l" stretched style={{ marginRight: 8 }} onClick={this.acceptRequest}>Выполнено</UI.Button>
                  <UI.Button size="l" stretched onClick={this.declineRequest}>Нужна помощь</UI.Button>
                </UI.Div>
              </UI.FormLayout>
            </UI.Panel>
          </UI.View>
        </UI.Root>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      tempRequests: requestSelectors.getTmpRequests(state),
      jobType: requestSelectors.getTypeJobs(state),
      jobPriority: requestSelectors.getCategoryOfJobs(state),
      locations: userSelectors.getLocations(state)
    };
  }

export default connect(mapStateToProps)(RequestsScreen);
