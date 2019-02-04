import React from 'react'
import VKConnect from '@vkontakte/vkui-connect'
import { Epic, FixedLayout, Tabs, TabsItem, HorizontalScroll, Tabbar, TabbarItem, View, Root, Panel, PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui'
import DataManager from './utils/DataManager'
import '@vkontakte/vkui/dist/vkui.css'

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon24Back from '@vkontakte/icons/dist/24/back'
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed'
import Icon28Search from '@vkontakte/icons/dist/28/search'
import Icon28Write from '@vkontakte/icons/dist/28/write'
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite'
import Icon28User from '@vkontakte/icons/dist/28/user'

import PostsList from './screens/Posts/views/PostsList'
import Search from './screens/Search/views/SearchPage'
import Contests from './screens/Contests/views/Contests'

import PostPage from './screens/Posts/views/page/PostPage'
import ContestPage from './screens/Contests/views/page/ContestPage'
import UserPage from './screens/Users/views/page/UserPage'

import PopularTagsList from './screens/Tags/views/PopularTagsList'
import PaidUsersList from './screens/Users/views/PaidUsersList'

// import Editor from './screens/Editor'
// import UserProfile from './screens/UserProfile'
// import About from './screens/About'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeStory: 'epicPages',
      activeView: 'feed',
      activePanel: 'feed',
      activeTab: 'latest',
      epicTab: 'feed',
      username: 'polina',
      headerModalTitle: 'Полина (Pola) Шибеева',
      popularTab: 'day',
      fetchedUser: null,
      userInfoDenied: false
    }
  }

  componentDidMount () {
    this._isMounted = true
    // this.getUserInfo()
    // this.getTheme()
  }

  componentWillUnmount () {
    DataManager.clear()
    this._isMounted = false
  }

  getUserInfo = () => {
    VKConnect.subscribe(e => {
      switch (e.detail.type) {
        case 'VKWebAppGetUserInfoResult':
          if (this._isMounted) this.setState({ fetchedUser: e.detail.data, activeTab: 'myfeed' })
          break
        case 'VKWebAppGetUserInfoFailed':
          if (this._isMounted) this.setState({ userInfoDenied: true, activeTab: 'latest' })
          break
        default:
          this.setState({ activeTab: 'latest' })
          // console.log(e.detail.type)
          break
      }
    })
    VKConnect.send('VKWebAppGetUserInfo', {})
  }

  getTheme = () => {
    VKConnect.subscribe(e => {
      switch (e.detail.type) {
        case 'VKWebAppUpdateConfig':
          let schemeAttribute = document.createAttribute('scheme')
          schemeAttribute.value = e.detail.data.scheme
            ? e.detail.data.scheme
            : 'client_light'
          document.body.attributes.setNamedItem(schemeAttribute)
          break
        default:
          // console.log(e.detail.type)
          break
      }
    })
  }

  go = (e) => {
    const { view, panel, postid, contestid, contestslug, userid, username, tagid, tagname, headertitle } = e.currentTarget.dataset
    const { activeStory, activeView, activeTab, activePanel } = this.state
    console.log('New params: ', e.currentTarget.dataset)
    let newState = {
      activeStory: 'modalPages',
      activeTab: null,
      returnStory: activeStory === 'modalPages' ? 'modalPages' : 'epicPages',
      returnView: activeView,
      returnPanel: activePanel,
      returnTab: activeTab,
    }

    if (panel) {
      newState = {
        ...newState,
        activePanel: panel
      }
    }

    if (view) {
      newState = {
        ...newState,
        activeView: view
      }
    }

    if (postid) {
      newState = {
        ...newState,
        postId: postid,
      }
    }

    if (contestid) {
      newState = {
        ...newState,
        contestId: contestid,
        contestSlug: contestslug,
      }
    }

    if (userid) {
      newState = {
        ...newState,
        userId: userid,
        username: username,
      }
    }

    if (tagid) {
      newState = {
        ...newState,
        tagId: tagid,
        tagName: tagname,
      }
    }

    if (headertitle) {
      newState = {
        ...newState,
        headerModalTitle: headertitle
      }
    }

    this.setState(newState)
  }

  returnTo = () => {
    const { returnStory, returnView, returnPanel, returnTab } = this.state
    console.log('returnTo: ', this.state)
    this.setState({
      activeStory: returnStory || 'epicPages',
      activeView: returnView || 'feed',
      activePanel: returnPanel || 'feed',
      activeTab: returnTab || 'latest',
      returnStory: null,
      returnView: null,
      returnPanel: null,
      returnTab: null
    })
  }

  onStoryChange = (activeView) => (e) => {
    const { story, epictab } = e.currentTarget.dataset
    console.log('story change', e.currentTarget.dataset)
    if (story === 'epicPages') {
      this.setState({ activeStory: story, epicTab: epictab, activeView, activeTab: 'latest' })
    } else {
      this.setState({ activeStory: story, epicTab: epictab, activeView })
    }
  }

  render () {
    const { fetchedUser, userInfoDenied } = this.state
    console.log('state: ', this.state)
    const osname = platform()

    return (<Epic
      activeStory={this.state.activeStory}
      tabbar={
        <Tabbar>
          <TabbarItem
            onClick={this.onStoryChange('feed')}
            selected={this.state.epicTab === 'feed'}
            data-story='epicPages'
            data-epictab='feed'
          ><Icon28Newsfeed /></TabbarItem>
          <TabbarItem
            onClick={this.onStoryChange('search')}
            selected={this.state.epicTab === 'search'}
            data-story='epicPages'
            data-epictab='search'
          ><Icon28Search /></TabbarItem>
        {/* <TabbarItem
            onClick={this.onStoryChange('write')}
            selected={this.state.epicTab === 'write'}
            data-story='epicPages'
            data-epictab='write'
          ><Icon28Write/></TabbarItem> */}
          <TabbarItem
            onClick={this.onStoryChange('contests')}
            selected={this.state.epicTab === 'contests'}
            data-story='epicPages'
            data-epictab='contests'
          ><Icon28Favorite/></TabbarItem>
        {/* <TabbarItem
            onClick={this.onStoryChange('user')}
            selected={this.state.epicTab === 'user'}
            data-story='epicPages'
            data-epictab='user'
          ><Icon28User /></TabbarItem> */}
        </Tabbar>
      }
    >
      <Root id='epicPages' activeView={this.state.activeView}>
        <View id='feed' activePanel='feed'>
          <Panel id='feed'>
            <PanelHeader
              noShadow
              left={
                <HeaderButton>

                </HeaderButton>
              }
              right={
                <HeaderButton>

                </HeaderButton>
              }
            >
              Лента постов
            </PanelHeader>
            <FixedLayout vertical='top'>
              <Tabs theme='header' type='buttons'>
                <HorizontalScroll>
                  {this.state.fetchedUser && <TabsItem
                    onClick={() => this.setState({ activeTab: 'myfeed' })}
                    selected={this.state.activeTab === 'myfeed'}
                  >
                    Моя лента
                  </TabsItem>}
                  <TabsItem
                    onClick={() => this.setState({ activeTab: 'latest' })}
                    selected={this.state.activeTab === 'latest'}
                  >
                    Последнее
                  </TabsItem>
                  <TabsItem
                    onClick={() => this.setState({ activeTab: 'popular' })}
                    selected={this.state.activeTab === 'popular'}
                  >
                    Популярное
                  </TabsItem>
                </HorizontalScroll>
              </Tabs>
            </FixedLayout>
            {this.state.fetchedUser && this.state.activeTab === 'myfeed' &&
              <Root activeView='latest'>
                <View id='latest' activePanel='latest'>
                  <Panel id='latest'>
                    <PostsList go={this.go} type='myfeed' personal />
                  </Panel>
                </View>
              </Root>
            }
            {this.state.activeTab === 'latest' &&
              <Root activeView='latest'>
                <View id='latest' activePanel='latest'>
                  <Panel id='latest'>
                    {/* <img src='https://cdn.ryfma.com/defaults/icons/HomeBanner600.png' alt='Ryfma - стихи и книги, которые Вы полюбите' /> */}
                    <PaidUsersList go={this.go} />
                    <PopularTagsList go={this.go} />
                    <PostsList go={this.go} type='latest' replaceFeed withImage />
                  </Panel>
                </View>
              </Root>
            }
            {this.state.activeTab === 'popular' &&
              <Root activeView='latest'>
                <View id='latest' activePanel='latest'>
                  <Panel id='latest'>
                    <PostsList go={this.go} type='popular' replaceFeed duration={this.state.popularTab} />
                  </Panel>
                </View>
              </Root>
            }
          </Panel>
        </View>
        <View id='search' activePanel='search'>
          <Panel id='search'>
            <PanelHeader noShadow>Поиск</PanelHeader>
            <Search go={this.go} />
          </Panel>
        </View>
        {/* <View id='write' activePanel='write'>
          <Panel id='write'>
            <PanelHeader>Создание поста</PanelHeader>
          </Panel>
        </View> */}
        <View id='contests' activePanel='contests'>
          <Panel id='contests'>
            <PanelHeader>Конкурсы</PanelHeader>
            <Contests go={this.go} />
          </Panel>
        </View>
        <View id='user' activePanel='user'>
          <Panel id='user'>
            <PanelHeader>Иван Иванов</PanelHeader>
          </Panel>
        </View>
      </Root>
      <Root id='modalPages' activeView={this.state.activeView}>
        <View id='postpage' activePanel={this.state.activePanel}>
          <Panel id='postpage'>
            <PanelHeader
              left={<HeaderButton onClick={this.returnTo}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
              addon={<HeaderButton onClick={this.returnTo}>Назад</HeaderButton>}
            >
              {this.state.headerModalTitle}
            </PanelHeader>
            <PostPage fetchedUser={fetchedUser} postId={this.state.postId} go={this.go} />
          </Panel>
        </View>
        <View id='contestpage' activePanel={this.state.activePanel}>
          <Panel id='contestpage'>
            <PanelHeader
              left={<HeaderButton onClick={this.returnTo}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
              addon={<HeaderButton onClick={this.returnTo}>Назад</HeaderButton>}
            >
              {this.state.headerModalTitle}
            </PanelHeader>
            <ContestPage fetchedUser={fetchedUser} contestSlug={this.state.contestSlug} contestId={this.state.contestId} go={this.go} />
          </Panel>
        </View>
        <View id='userpage' activePanel={this.state.activePanel}>
          <Panel id='userpage'>
            <PanelHeader
              left={<HeaderButton onClick={this.returnTo}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
              addon={<HeaderButton onClick={this.returnTo}>Назад</HeaderButton>}
            >
              {this.state.headerModalTitle}
            </PanelHeader>
            <UserPage fetchedUser={fetchedUser} username={this.state.username} userId={this.state.userId} go={this.go} replaceFeed />
          </Panel>
        </View>
        <View id='tagspage' activePanel={this.state.activePanel}>
          <Panel id='tagspage'>
            <PanelHeader
              left={<HeaderButton onClick={this.returnTo}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
              addon={<HeaderButton onClick={this.returnTo}>Назад</HeaderButton>}
            >
              {this.state.headerModalTitle}
            </PanelHeader>
            <PostsList
              go={this.go}
              replaceFeed
              tagId={this.state.tagId}
              subTitle={'Стихи по тегу ' + this.state.tagName}
            />
          </Panel>
        </View>
      </Root>
    </Epic>)
  }
}

export default App
