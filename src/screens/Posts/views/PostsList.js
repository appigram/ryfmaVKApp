import React, {Component} from 'react'
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
      activeTab: 'latest',
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

  fetchMorePosts = ({ activeTab, replaceFeed, skip }) => () => {
    const { userId, albumId, tagId, festId, withImage, duration, personal, keyword, limit } = this.props
    this.props.getPosts({
      type: activeTab,
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
    if (activeTab) this.setState({ activeTab })
  }

  render () {
    const { posts, isPendingPosts, type, userId, personal } = this.props

    const userTabs = <Group>
      <Tabs type='buttons'>
        <HorizontalScroll>
          <TabsItem
            onClick={this.fetchMorePosts({ activeTab: 'latest', replaceFeed: true, skip: 0 })}
            selected={this.state.activeTab === 'latest'}
          >
            Последние
          </TabsItem>
          <TabsItem
            onClick={this.fetchMorePosts({ activeTab: 'popular', replaceFeed: true, skip: 0 })}
            selected={this.state.activeTab === 'popular'}
          >
            Популярные
          </TabsItem>
          <TabsItem
            onClick={this.fetchMorePosts({ activeTab: 'viewed', replaceFeed: true, skip: 0 })}
            selected={this.state.activeTab === 'viewed'}
          >
            Читаемые
          </TabsItem>
          <TabsItem
            onClick={this.fetchMorePosts({ activeTab: 'commented', replaceFeed: true, skip: 0 })}
            selected={this.state.activeTab === 'commented'}
          >
            Комментируемые
          </TabsItem>
        </HorizontalScroll>
      </Tabs>
    </Group>

    const activeTabs = (<Tabs theme="light">
      <TabsItem
        onClick={this.fetchMorePosts({ activeTab: 'day', replaceFeed: true })}
        selected={this.state.activeTab === 'day'}
      >
        За день
      </TabsItem>
      <TabsItem
        onClick={this.fetchMorePosts({ activeTab: 'week', replaceFeed: true })}
        selected={this.state.activeTab === 'week'}
      >
        За неделю
      </TabsItem>
      <TabsItem
        onClick={this.fetchMorePosts({ activeTab: 'month', replaceFeed: true })}
        selected={this.state.activeTab === 'month'}
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
