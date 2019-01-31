import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { searchPosts, searchUsers } from '../search.action'
import { getPaidUsers } from '../../Users/users.action'
import Loader from '../../../components/Loader'
import PostsListItem from '../../Posts/views/PostsListItem'
import UsersInfoItem from '../../Users/views/UsersInfoItem'
import UsersInfoVerticalItem from '../../Users/views/UsersInfoVerticalItem'
import EmptySearch from './EmptySearch'

import { FixedLayout, Group, List, Div, Button, Search, Tabs, TabsItem } from '@vkontakte/vkui'

class SearchPage extends Component {
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
    this.props.getPaidUsers({})
  }

  handleSearch = (keyword, activeTab) => {
    const currTab = activeTab ? activeTab : this.state.activeTab
    if (keyword) {
      if (currTab === 'posts') {
        this.props.searchPosts({
          keyword,
          limit: 24
        })
      } else if (currTab === 'users') {
        this.props.searchUsers({
          keyword,
          limit: 24
        })
      }
    }
  }

  changeTab = (activeTab) => () => {
    const { keyword } = this.state
    this.setState({ activeTab })
    this.handleSearch(keyword, activeTab)
  }

  onChange = (search) => {
    const { activeTab } = this.state
    this.setState({ keyword: search })
    this.handleSearch(search, activeTab)
  }

  fetchMorePosts = (activeTab) => {
    const { posts } = this.props
    this.props.searchPosts({
      skip: posts.length,
      limit: 15
    })
  }

  fetchMoreUsers = (activeTab) => {
    const { users } = this.props
    this.props.searchUsers({
      skip: users.length,
      limit: 15
    })
  }

  render () {
    const { posts, users, paidUsers, isPendingPosts, isPendingUsers, isPendingPaidUsers } = this.props
    const { keyword, activeTab } = this.state
    return (
      <div>
        <FixedLayout vertical='top'>
          <Search value={this.state.search} onChange={this.onChange} />
        </FixedLayout>
        {!keyword && <div className='paid-users' style={{ marginTop: 56 }}>
          <Group title='Рекомендуем подписаться'>
            {paidUsers.map(user => {
              return (<UsersInfoVerticalItem user={user} go={this.props.go} />)
            })}
          </Group>
          <div className='get-started-block'>
            <h3>Публикуй свое творчество</h3>
            <p>Создание и публикация своих произведений на Ryfma бесплатна</p>
            <Button size="l">Давайте начнем</Button>
          </div>
        </div>}
        {keyword && <Tabs theme="light" style={{ marginTop: 56 }}>
          <TabsItem
            onClick={this.changeTab('users')}
            selected={activeTab === 'users'}
          >
            Авторы
          </TabsItem>
          <TabsItem
            onClick={this.changeTab('posts')}
            selected={activeTab === 'posts'}
          >
            Посты
          </TabsItem>
        </Tabs>}

        {(isPendingUsers || isPendingPosts) && <Loader />}

        {users.length === 0 && activeTab === 'users' && keyword && <EmptySearch />}
        {posts.length === 0 && activeTab === 'posts' && keyword && <EmptySearch />}

        {users.length > 0 && activeTab === 'users' &&
          <List>
            {users.map(user => (<Div className='user-info-wrapper'>
              <UsersInfoItem key={user._id} user={user} go={this.props.go} />
            </Div>)
            )}
            <Div>
              <Button size="xl" level="secondary" onClick={this.fetchMoreUser}>Загрузить еще</Button>
            </Div>
          </List>
        }

        {posts.length > 0 && activeTab === 'posts' &&
          <List>
            {posts.map(post => <PostsListItem key={post._id} post={post} go={this.props.go} />)}
            <Div>
              <Button size="xl" level="secondary" onClick={this.fetchMorePosts}>Загрузить еще</Button>
            </Div>
          </List>
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log('mapStateToProps')
  console.log(state)
  return {
    posts: state.search.posts,
    users: state.search.users,
    paidUsers: state.users.paidUsers,
    isPendingPosts: state.search.isPendingPosts,
    isPendingUsers: state.search.isPendingUsers,
    isPendingPaidUsers: state.users.isPendingPaidUsers
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    searchPosts,
    searchUsers,
    getPaidUsers
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
