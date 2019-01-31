import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPosts } from '../../posts.action'
import Loader from '../../../../components/Loader'
import PostsListItem from '../PostsListItem'
import EmptyPosts from '../EmptyPosts'

import { Root, View, Panel, List, Button, Div } from '@vkontakte/vkui'

class LatestPosts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      latestPosts: [],
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
    this.props.getPosts({type: 'latest', replaceFeed: true})
  }

  refetchData = () => {
    this.setState({refreshing: true})
    this.props.getPosts({type: 'latest', force: true})
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
      personal: false,
      skip: latestPosts.length,
      limit: 15
    })
  }

  render () {
    const {latestPosts, isPendingLatestPosts} = this.props

    if (!latestPosts) {
      return (<EmptyPosts />)
    }

    if (latestPosts.length === 0) {
      return (<EmptyPosts />)
    }

    return (
      <Root activeView='latest'>
        <View id='latest' activePanel='latest'>
          <Panel id='latest'>
            <List>
              {latestPosts.map(post =>
                <PostsListItem
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
          </Panel>
        </View>
      </Root>
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
