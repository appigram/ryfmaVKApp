import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFestPostsInfo } from '../contests.action'
import Loader from '../../../components/Loader'
import ContestPostItem from './ContestPostItem'
import EmptyPosts from '../../Posts/views/EmptyPosts'

import { List, Button, Div } from '@vkontakte/vkui'

class LatestPosts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contestPosts: [],
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
    console.log('festPosts: ', this.props)
    this.props.getFestPostsInfo({
      festId: this.props.fest._id,
      keyword: this.props.keyword,
      sortType: this.props.sortType,
      filterType: this.props.filterType,
      city: this.props.citySelected,
      skip: 0,
      limit: 8
    })
  }

  refetchData = () => {
    this.setState({refreshing: true})
    this.props.getFestPostsInfo({
      festId: this.props.festId,
      keyword: this.props.keyword,
      sortType: this.props.sortType,
      filterType: this.props.filterType,
      city: this.props.citySelected,
      skip: 0,
      limit: 8
    })
    .then(() => {
      this.setState({
        refreshing: false,
      })
    })
  }

  fetchMorePosts = () => {
    const { contestPosts } = this.props
    this.props.getPosts({
      festId: this.props.festId,
      keyword: this.props.keyword,
      sortType: this.props.sortType,
      filterType: this.props.filterType,
      city: this.props.citySelected,
      skip: contestPosts.length,
      limit: 8
    })
  }

  render () {
    const {contestPosts, isPendingLatestPosts} = this.props

    if (!contestPosts) {
      return (<EmptyPosts />)
    }

    if (contestPosts.length === 0) {
      return (<EmptyPosts />)
    }

    return (
      <div className='contest-posts-wrapper'>
        <h2>Стихи участников</h2>
        <div className='ui segment user-posts'>
          <h3>Не стесняйтесь обсуждать и оценивать лайками (от 0 до 50) произведения</h3>
          <List>
            {contestPosts.map(post =>
              <ContestPostItem
                key={post._id}
                post={post}
                go={this.props.go}
              />
            )}
            {isPendingLatestPosts && <Loader />}
            <Div>
              <Button size="xl" level="secondary" onClick={this.fetchMorePosts}>Загрузить еще</Button>
            </Div>
          </List>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log('mapStateToProps')
  console.log(state)
  return {
    contestPosts: state.contests.contestPosts,
    isPendingContestPosts: state.contests.isPendingContestPosts

  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getFestPostsInfo
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts)
