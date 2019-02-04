import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPosts } from '../posts.action'
import Loader from '../../../components/Loader'
import PostsListItem from './PostsListItem'
import EmptyPosts from './EmptyPosts'

import { Group, HorizontalScroll, Tabs, TabsItem, List, Button, Div } from '@vkontakte/vkui'

class PostsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      activeType: 'latest',
      activeDuration: 'day',
      lastType: props.type,
      duration: props.duration
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
    console.log('props: ', this.props)
    const { type, userId, albumId, tagId, festId, withImage, duration, personal, keyword, skip, limit, force, replaceFeed } = this.props
    this.props.getPosts({
      type, userId, albumId, tagId, festId, withImage, duration, personal, keyword, skip, limit, force, replaceFeed
    })
  }

  fetchMorePosts = ({ type, duration, replaceFeed, skip }) => () => {
    const { type, userId, albumId, tagId, festId, withImage, personal, keyword, limit } = this.props
    this.props.getPosts({
      type,
      userId,
      albumId,
      tagId,
      festId,
      withImage,
      duration,
      personal,
      keyword,
      force: true,
      replaceFeed,
      skip,
      limit
    })
    if (type) this.setState({ activeType: type })
    if (duration) this.setState({ activeDuration: duration })
  }

  render () {
    const { posts, isPendingPosts, type, userId, personal } = this.props

    const userTabs = <Group>
      <Tabs type='buttons'>
        <HorizontalScroll>
          <TabsItem
            onClick={this.fetchMorePosts({ type: 'latest', replaceFeed: true, skip: 0 })}
            selected={this.state.activeType === 'latest'}
          >
            Последние
          </TabsItem>
          <TabsItem
            onClick={this.fetchMorePosts({ type: 'popular', replaceFeed: true, skip: 0 })}
            selected={this.state.activeType === 'popular'}
          >
            Популярные
          </TabsItem>
          <TabsItem
            onClick={this.fetchMorePosts({ type: 'viewed', replaceFeed: true, skip: 0 })}
            selected={this.state.activeType === 'viewed'}
          >
            Читаемые
          </TabsItem>
          <TabsItem
            onClick={this.fetchMorePosts({ type: 'commented', replaceFeed: true, skip: 0 })}
            selected={this.state.activeType === 'commented'}
          >
            Комментируемые
          </TabsItem>
        </HorizontalScroll>
      </Tabs>
    </Group>

    const activeTabs = (<Tabs theme="light">
      <TabsItem
        onClick={this.fetchMorePosts({ type: 'popular', duration: 'day', replaceFeed: true })}
        selected={this.state.activeDuration === 'day'}
      >
        За день
      </TabsItem>
      <TabsItem
        onClick={this.fetchMorePosts({ type: 'popular', duration: 'week', replaceFeed: true })}
        selected={this.state.activeDuration === 'week'}
      >
        За неделю
      </TabsItem>
      <TabsItem
        onClick={this.fetchMorePosts({ type: 'popular', duration: 'month', replaceFeed: true })}
        selected={this.state.activeDuration === 'month'}
      >
        За месяц
      </TabsItem>
    </Tabs>)

    return (<Group>
      {type === 'popular' && activeTabs}
      {userId && personal && userTabs}
      {(!posts || posts.length === 0) && <EmptyPosts />}
      {isPendingPosts && <Loader />}
      <List>
        {posts.map(post =>
          <PostsListItem
            key={post._id}
            post={post}
            go={this.props.go}
          />
        )}
        <Div>
          <Button size="xl" level="secondary" onClick={this.fetchMorePosts({ activeTab: this.state.activeTab, replaceFeed: false, skip: this.state.posts.length })}>Загрузить еще</Button>
        </Div>
      </List>
    </Group>)
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

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)
