import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPosts } from '../../posts.action'
import Loader from '../../../../components/Loader'
import PostsListItem from '../PostsListItem'
import EmptyPosts from '../EmptyPosts'

import { Group, List, Button, Div } from '@vkontakte/vkui'

class LatestPosts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      latestPosts: [],
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
    this.props.getPosts({
      type: 'latest',
      withImage: true,
      replaceFeed: true
    })
  }

  refetchData = () => {
    this.setState({refreshing: true})
    this.props.getPosts({type: 'latest', withImage: true, force: true})
    .then(() => {
      this.setState({
        refreshing: false,
      })
    })
  }

  fetchMorePosts = () => {
    const { latestPosts } = this.props
    this.props.getPosts({
      type: 'latest',
      withImage: true,
      skip: latestPosts.length,
      limit: 15
    })
  }

  render () {
    const {latestPosts, isPendingLatestPosts} = this.props

    if (isPendingLatestPosts) {
      return <Loader />
    }

    if (!latestPosts) {
      return (<EmptyPosts />)
    }

    if (latestPosts.length === 0) {
      return (<EmptyPosts />)
    }

    return (
      <Group id='latest'>
        <List>
          {latestPosts.map(post =>
            <PostsListItem
              key={post._id}
              post={post}
              go={this.props.go}
            />
          )}
          <Div>
            <Button size="xl" level="secondary" onClick={this.fetchMorePosts}>Загрузить еще</Button>
          </Div>
        </List>
      </Group>
    )
  }
}

function mapStateToProps (state) {
  console.log('mapStateToProps')
  console.log(state)
  return {
    latestPosts: state.posts.latestPosts,
    isPendingLatestPosts: state.posts.isPendingLatestPosts

  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getPosts
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts)
