import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {push} from 'react-router-redux';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Cancel from '@vkontakte/icons/dist/24/search';
import Icon24Plus from '@vkontakte/icons/dist/24/add';
import _ from 'lodash';


import * as employeeActions from '../../store/createEmployee/actions'
import * as employeeSelectors from '../../store/createEmployee/reducer'
import * as requestSelectors from '../../store/userRequest/reducer'

const osname = UI.platform();
class WorkersItem extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      activeView: "main",
			activePanel: "workers",
      popout: null,
      workerID: -1,
      post: -1,
      timeTable:-1,
      password: "",
      area: -1,
      workPhone: ""
		}
  }

  changeID(e) {
    this.setState({workerID: e.target.value});
  }

  changePost(e) {
    this.setState({post: e.target.value});
  }

  changeTimeTable(e) {
    this.setState({timeTable: e.target.value});
  }

  changePassword(e) {
    this.setState({password: e.target.value});
  }

  changeArea(e) {
    this.setState({area: e.target.value})
  }

  changeWorkphone(e) {
    this.setState({workPhone: e.target.value})
  }

  showEmployee(e) {
    console.log(e);
  }

  componentWillMount() {
    this.props.dispatch(employeeActions.fetchPosts());
    this.props.dispatch(employeeActions.fetchTimeTables());
    this.props.dispatch(employeeActions.fetchWorkers());
    this.props.dispatch(employeeActions.fetchPosts());
  }

  registerNewEmployee() {
    this.props.dispatch(employeeActions.createEmployee("Виктор", "Волков", this.state.area, "1995-20-10", this.state.workerID, this.state.timeTable, "WRK", this.state.password, this.state.post, "89213877640", this.state.workPhone, "vvlkv@icloud.com"))
    this.openSheet.bind(this);
  }

  preRender() {
    return(
      <UI.View id="spinner" activePanel="spinner">
        <UI.Panel id="spinner">
          <div style={{ height: 100 }}>
            <UI.Spinner />
          </div>
        </UI.Panel>
      </UI.View>
    )
  }

  openSheet () {
    console.log("openSheet");
    this.setState({ popout:
      <UI.Alert
        actions={[
        {
          title: 'ОК',
          autoclose: true,
          style: 'cancel'
        }]}
        onClose={ () => this.setState({ popout: null, activePanel:"workers" }) }
      >
        <h2>Сотрудник добавлен!</h2>
      </UI.Alert>
    });
  }

  getPostName(idPost) {
    console.log("ID");
    console.log(idPost);
    var ind = _.findIndex(this.props.posts, { 'id': idPost });
      console.log("ind");
      console.log(ind);
        console.log("ret");
        if(ind>=0) {
      console.log(this.props.posts[ind].post);
      return this.props.posts[ind].post;
    }
  }

  render() {

    if (!this.props.posts || !this.props.timeTables || !this.props.workers) return  this.preRender();
    return (
      <UI.Root activeView={this.state.activeView}>
        <UI.View popout={this.state.popout} id="main" activePanel={this.state.activePanel}>
          <UI.Panel id='workers'>
            <UI.PanelHeader
              left={<UI.HeaderButton onClick={() => this.setState({ activePanel: "addworker"})}> <Icon24Plus/> </UI.HeaderButton>}>
              Сотрудники
            </UI.PanelHeader>
            <UI.Group>
              <UI.List>
                {this.props.workers.map(employee => <div> <UI.Cell expandable description={  _.get(_.keyBy(this.props.posts, "id")[employee.post] , 'post', 'Скрыто') } onClick={this.showEmployee.bind(this, employee)}> {employee.name} {employee.lastname} </UI.Cell> </div>)}
              </UI.List>
            </UI.Group>
          </UI.Panel>
          <UI.Panel id="addworker">
            <UI.PanelHeader left={<UI.HeaderButton onClick={() => this.setState({ activePanel: "workers"})}>{osname === UI.IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</UI.HeaderButton>}>Добавить</UI.PanelHeader>
            <UI.FormLayout>
              <UI.Input
                type="ID"
                top="ID сотрудника"
                bottom="Введите ID ВКонтакте сотрудника, которого необходимо зарегистрировать"
                onChange={this.changeID}/>
              <UI.Select top="Должность сотрудника" placeholder="" onChange={this.changePost}>
                {this.props.posts.map(post => <option value={post.id}>{post.post}</option>)}
              </UI.Select>
              <UI.Select top="Время работы" placeholder="" onChange={this.changeTimeTable}>
                {this.props.timeTables.map(timetable => <option value={timetable.id}>{timetable.timetable}</option>)}
              </UI.Select>
              <UI.Select top="Место работы" placeholder="" onChange={this.changeArea}>
                {this.props.locations.map(location => <option value={location.id}>{location.name}</option>)}
              </UI.Select>
              <UI.Input type="text"
                top="Рабочий телефон"
                onChange={this.changeWorkphone}/>
              <UI.Input
                type="password"
                top="Пароль"
                onChange={this.changeID}/>
            </UI.FormLayout>
            <UI.Button size="xl" level="secondary" onClick={this.registerNewEmployee.bind(this)}>Зарегистрировать</UI.Button>
          </UI.Panel>
          <UI.Panel id="aboutemployee">
            <UI.PanelHeader>Про сотрудника</UI.PanelHeader>
          </UI.Panel>
        </UI.View>
      </UI.Root>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: employeeSelectors.getPosts(state),
    timeTables: employeeSelectors.getTimeTables(state),
    locations: requestSelectors.getLocations(state),
    workers: employeeSelectors.getWorkers(state),
    posts: employeeSelectors.getPosts(state)
  };
}

export default connect(mapStateToProps)(WorkersItem);
