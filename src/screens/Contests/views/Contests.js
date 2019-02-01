import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFestivalsInfo } from '../contests.action'
import Loader from '../../../components/Loader'
import ContestsItem from './ContestsItem'
import EmptyContests from './EmptyContests'

import { Group, List, Div, Button, Tabs, TabsItem } from '@vkontakte/vkui'

class Contests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keyword: '',
      activeTab: 'users',
      searchResult: []
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
    this.props.getFestivalsInfo({
      genreType: 'Все жанры',
      sortType: 'mostPeople',
      location: 'worldwide'
    })
  }

  changeTab = (activeTab) => () => {
    const { keyword } = this.state
    this.setState({ activeTab })
    this.handleSearch(keyword, activeTab)
  }

  fetchMoreContests = (activeTab) => {
    const { contests } = this.props
    this.props.getFestivalsInfo({
      skip: contests.length,
      limit: 7
    })
  }

  render () {
    const { contests, isPendingContests } = this.props
    const { keyword, activeTab } = this.state
    return (
      <Group title='Текущие конкурсы'>
        {/* keyword && <Tabs theme="light">
          <TabsItem
            onClick={this.changeTab('users')}
            selected={activeTab === 'users'}
          >
            Авторы
          </TabsItem>
          <TabsItem
            onClick={this.changeTab('contests')}
            selected={activeTab === 'contests'}
          >
            Посты
          </TabsItem>
        </Tabs> */}

        {isPendingContests && <Loader />}

        {contests.length === 0 && keyword && <EmptyContests />}

        {contests.length > 0 &&
          <List>
            {contests.map(contest => <ContestsItem key={contest._id} contest={contest} go={this.props.go} />)}
            <Div>
              <Button size="xl" level="secondary" onClick={this.fetchMoreContests}>Загрузить еще</Button>
            </Div>
          </List>
        }
      </Group>
    )
  }
}

function mapStateToProps (state) {
  console.log('mapStateToProps')
  console.log(state)
  return {
    contests: state.contests.contests,
    isPendingContests: state.contests.isPendingContests,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getFestivalsInfo
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Contests)
