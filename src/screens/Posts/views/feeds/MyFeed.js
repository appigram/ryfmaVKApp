import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPosts } from '../../posts.action'
import Loader from '../../../../components/Loader'
import PostsListItem from '../PostsListItem'
import EmptyPosts from '../EmptyPosts'

import { Root, View, Panel, List, Button, Div } from '@vkontakte/vkui'

class MyFeed extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fetchedUser: props.fetchedUser
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
    this.props.getPosts({type: 'following', userId: this.state.fetchedUser, force: true})
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
    const { posts } = this.props
    this.props.getPosts({
      type: 'following',
      personal: false,
      userId: this.state.fetchedUser,
      skip: posts.length,
      limit: 15
    })
  }

  render () {
    const {posts, isPendingPosts} = this.props
    
    if (!posts) {
      return (<EmptyPosts />)
    }

    if (posts.length === 0) {
      return (<EmptyPosts />)
    }

    return (
      <Root activeView='latest'>
        <View id='latest' activePanel='latest'>
          <Panel id='latest'>
            <List>
              {posts.map(post =>
                <PostsListItem
                  key={post._id}
                  post={post}
                  go={this.props.go}
                />
              )}
              {isPendingPosts && <Loader />}
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
    posts: state.posts.posts,
    isPendingPosts: state.posts.isPendingPosts
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getPosts
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(MyFeed)
