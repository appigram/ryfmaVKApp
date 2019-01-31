import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserInfo } from '../../users.action'
import PostsList from '../../../Posts/views/PostsList'
import Loader from '../../../../components/Loader'
import UserNotFound from '../UserNotFound'
import { extractRootDomain, parseText } from '../../../../utils/Helpers'

import { Group, Avatar, HorizontalScroll, Button, Div, Link } from '@vkontakte/vkui'

import Icon16Verified from '@vkontakte/icons/dist/16/verified'
import Icon16Fire from '@vkontakte/icons/dist/16/fire'
import Icon24Globe from '@vkontakte/icons/dist/24/globe'
import Icon24Place from '@vkontakte/icons/dist/24/place'
import Icon24VK from '@vkontakte/icons/dist/24/logo_vk'
import Icon24Instagram from '@vkontakte/icons/dist/24/logo_instagram'
import Icon24Twitter from '@vkontakte/icons/dist/24/logo_twitter'
import Icon24Facebook from '@vkontakte/icons/dist/24/logo_facebook'
import Icon24Videocam from '@vkontakte/icons/dist/24/videocam'
import Icon24Dropdown from '@vkontakte/icons/dist/24/dropdown'

import '../styles.css'

class UserPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showBio: false,
      activeTab: 'latest'
    }
  }

  componentWillMount () {
    console.log('componentWillMount UserPage')
    console.log('props: ', this.props)
    this.props.getUserInfo({ username: this.props.username })
    window.scrollTo(0, 0)
  }

  handleDesc = () => {
    this.setState({
      showDesc: !this.state.showDesc
    })
  }

  render () {
    const { user, isPendingUser } = this.props

    if (isPendingUser) {
      return (<Loader />)
    }

    if (!user) {
      return (<UserNotFound />)
    }

    if (!user.profile) {
      return (<UserNotFound />)
    }

    const userLinks = [
      user.profile.vkUser,
      user.profile.instagramUser,
      user.profile.twitterUser,
      user.profile.facebookUser
    ]

    const socLinks = userLinks.map(link => {
      if (link) {
        return link.replace('https://', '').replace('http://', '').replace('www.', '')
      }
    })

    const maxChars = 80
    const festDescription = user.profile.bio || ''
    const numSentences = festDescription.split('\n')
    let sentsCounter = 0
    let shortDesc = []
    let restDesc = []
    numSentences.map((text, index) => {
      if (sentsCounter < maxChars) {
        if (text) {
          sentsCounter += text.length
          shortDesc.push(<span key={index} dangerouslySetInnerHTML={{ __html: `${parseText(text)}` }} />)
        }
      } else {
        if (text) {
          restDesc.push(<span key={index} dangerouslySetInnerHTML={{ __html: `${parseText(text)}` }} />)
        }
      }
    })

    return (<div>
      <Group>
        <Div className='user-page'>
          <Avatar size={130} src={user.profile.image} />
          <div className='content'>
            <h1>{user.profile.name}{user.emails ? (user.emails[0].verified && <Icon16Verified />) : null}</h1>
            <div className='karma'>
              <Icon16Fire fill='red' />
              {user.profile.karma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}&nbsp;Карма
            </div>
            {(user.profile.city || user.profile.website) && <div className='website-city'>
              {user.profile.website &&
                <div className='user-website'>
                  <ReactGA.OutboundLink
                    eventLabel='Go to User website'
                    to={`http://${user.profile.website.replace('https://', '').replace('http://', '')}`}
                    target='_blank'
                    rel='noopener nofollow'
                    className='item'
                    role='listitem'
                    itemProp='url'
                  >
                    <Icon24Globe />
                    {extractRootDomain(user.profile.website.replace('https://', '').replace('http://', ''))}
                  </ReactGA.OutboundLink>
                </div>
              }
              {user.profile.city &&
                <div className='user-city'>
                  <Icon24Place />
                  {user.profile.city}
                </div>
              }
            </div>}
            {socLinks.length &&
              <div className='meta'>
                <div className='ui list link horizontal'>
                  {user.profile.vkUser
                    ? <ReactGA.OutboundLink
                      eventLabel='Go to User VK'
                      to={`https://vk.com/${socLinks[0].replace('vk.com/', '')}`}
                      target='_blank'
                      rel='noopener nofollow'
                      role='listitem'
                      className='item vk'
                      itemProp='sameAs'
                    >
                      <Icon24VK />
                    </ReactGA.OutboundLink>
                    : null
                  }
                  {user.profile.instagramUser
                    ? <ReactGA.OutboundLink
                      eventLabel='Go to User Instagram'
                      to={`https://instagram.com/${socLinks[1].replace('instagram.com/', '')}`}
                      target='_blank'
                      rel='noopener nofollow'
                      role='listitem'
                      className='item in'
                      itemProp='sameAs'
                    >
                      <Icon24Instagram />
                    </ReactGA.OutboundLink>
                    : null
                  }
                  {user.profile.twitterUser
                    ? <ReactGA.OutboundLink
                      eventLabel='Go to User Twitter'
                      to={`https://twitter.com/${socLinks[2].replace('twitter.com/', '')}`}
                      target='_blank'
                      rel='noopener nofollow'
                      role='listitem'
                      className='item tw'
                      itemProp='sameAs'
                    >
                      <Icon24Twitter />
                    </ReactGA.OutboundLink>
                    : null
                  }
                  {user.profile.facebookUser
                    ? <ReactGA.OutboundLink
                      eventLabel='Go to User Facebook'
                      to={`https://facebook.com/${socLinks[3].replace('facebook.com/', '')}`}
                      target='_blank'
                      rel='noopener nofollow'
                      role='listitem'
                      className='item fb'
                      itemProp='sameAs'
                    >
                      <Icon24Facebook />
                    </ReactGA.OutboundLink>
                    : null
                  }
                  {user.profile.youtubeUser
                    ? <ReactGA.OutboundLink
                      eventLabel='Go to User Youtube'
                      to={`https://youtube.com/${socLinks[4].replace('youtube.com/', '')}`}
                      target='_blank'
                      rel='noopener nofollow'
                      role='listitem'
                      className='item youtube'
                      itemProp='sameAs'
                    >
                      <Icon24Videocam />
                    </ReactGA.OutboundLink>
                    : null
                  }
                  {/* <Link to={user.profile.okUser} role='listitem' target='_blank' rel='noopener' className='item ok'>
                    <i aria-hidden='true' className='icon odnoklassniki large' />
                  </Link> */}
                </div>
              </div>
            }
            <HorizontalScroll className='user-stats'>
              <div style={{ display: 'flex' }}>
                <div className='item'>
                  <b>{user.stats.postsCount || 0}</b>
                  Постов
                </div>
                <div className='item'>
                  <b>{user.stats.albumsCount || 0}</b>
                  Альбомов
                </div>
                <div className='item'>
                  <b>{user.stats.booksCount || 0}</b>
                  Книг
                </div>
                <div className='item'>
                  <b>{user.stats.followersCount || 0}</b>
                  Читателей
                </div>
                <div className='item'>
                  <b>{user.stats.followingCount || 0}</b>
                  Читаемых
                </div>
              </div>
            </HorizontalScroll>
            {user.profile.bio && <div className='extra'>
              {user.profile.bio.length > maxChars
                ? <div className='user-bio'>
                  <div className='slide-down' itemProp='description'>
                    {shortDesc}
                    {!this.state.showDesc && <div className='slide-fade' />}
                  </div>
                  <div className={this.state.showDesc ? 'slide-down-hidden open' : 'slide-down-hidden'} itemProp='description'>
                    {restDesc}
                  </div>
                  <div className='slide-down-button' onClick={this.handleDesc}>
                    {this.state.showDesc ? <Icon24Dropdown /> : <Icon24Dropdown />}
                  </div>
                </div>
                : <span itemProp='description'>{shortDesc}</span>
              }
            </div>
            }
          </div>
        </Div>
      </Group>
      <PostsList
        type={this.state.activeTab}
        shortPost={this.props.shortPost}
        hideAds
        userId={user._id}
        currUser={this.props.currUser}
        limit={this.props.limit}
        keyword={this.state.keyword}
        go={this.props.go}
        personal
        replaceFeed={this.props.replaceFeed}
      />
    </div>)
  }
}

function mapStateToProps (state) {
  console.log('mapStateToProps')
  console.log(state)
  return {
    user: state.users.user,
    isPendingUser: state.users.isPendingUser

  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUserInfo
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
