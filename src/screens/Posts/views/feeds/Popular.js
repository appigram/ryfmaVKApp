import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPosts } from '../../posts.action'
import Loader from '../../../../components/Loader'
import PostsListItem from '../PostsListItem'
import EmptyPosts from '../EmptyPosts'

import { Root, View, Panel, List, Button, Div, Tabs, TabsItem } from '@vkontakte/vkui'

class LatestPosts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bestPosts: [],
      activeTab: 'day'
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
    this.props.getPosts({type: 'popular', duration: 'day', replaceFeed: true})
  }

  fetchMorePosts = ({ activeTab, replaceFeed = false }) => {
    const { bestPosts } = this.props
    this.props.getPosts({
      type: 'popular',
      duration: activeTab,
      skip: bestPosts.length,
      replaceFeed,
      limit: 15
    })
  }

  changeTab = (activeTab) => () => {
    this.setState({ activeTab })
    this.fetchMorePosts(activeTab, true)
  }

  render () {
    const { bestPosts, isPendingBestPosts } = this.props

    return (
      <Root activeView='latest'>
        <View id='latest' activePanel='latest'>
          <Panel id='latest'>
            <Tabs theme="light">
              <TabsItem
                onClick={this.changeTab('day')}
                selected={this.state.activeTab === 'day'}
              >
                За день
              </TabsItem>
              <TabsItem
                onClick={this.changeTab('week')}
                selected={this.state.activeTab === 'week'}
              >
                За неделю
              </TabsItem>
              <TabsItem
                onClick={this.changeTab('month')}
                selected={this.state.activeTab === 'month'}
              >
                За месяц
              </TabsItem>
            </Tabs>
            <List>
              {bestPosts.length > 0 ?
                bestPosts.map(post =>
                  <PostsListItem
                    key={post._id}
                    post={post}
                    go={this.props.go}
                  />
                )
                :
                <EmptyPosts />
              }
              {isPendingBestPosts && <Loader />}
              {bestPosts.length > 0 && <Div>
                <Button size="xl" level="secondary" onClick={this.fetchMorePosts}>Загрузить еще</Button>
              </Div>}
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
    bestPosts: state.posts.bestPosts,
    isPendingBestPosts: state.posts.isPendingBestPosts

  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getPosts
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts)
