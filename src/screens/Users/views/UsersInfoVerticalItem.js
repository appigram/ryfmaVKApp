import React, { Component } from 'react'
import { Div, Avatar, Button, Cell } from '@vkontakte/vkui'

import Icon24Favorite from '@vkontakte/icons/dist/24/favorite'
import Icon24Users from '@vkontakte/icons/dist/24/users'
import Icon24Copy from '@vkontakte/icons/dist/24/copy'

import './styles.css'

class UsersInfoItem extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  goToUser = () => {
    
  }

  followUser = () => {
    
  }

  unFollowUser = () => {
    
  }

  render () {
    const { user } = this.props
    let avatar = user.profile.image || 'https://cdn.ryfma.com/defaults/icons/default_full_avatar.jpg'
    if (avatar.indexOf('_full_') > 0) {
      avatar = avatar.replace('_full_', `_medium_`)
    } else if (avatar.indexOf('graph.facebook.com') > 0) {
      avatar = avatar.replace('=large', '=square')
    }

    const itsme = false // currUserId === user._id
    const isShortBio = true
    let shortBio = user.profile.bio || ''
    if (isShortBio) {
      shortBio = shortBio.length > 40 ? shortBio.substr(0, 40) + '...' : shortBio
    } else {
      shortBio = shortBio.length > 160 ? shortBio.substr(0, 160) + '...' : shortBio
    }

    let followButton = null

    if (user.isFollowing) {
      followButton = <Button
        size='l'
        className='ui gray basic button follow'
        onClick={this.unFollowUser}
        style={{ marginTop: 8 }}
      >
        Отписаться
      </Button>
    } else {
      followButton = <Button
        size='l'
        className='ui green button follow'
        onClick={this.followUser}
        style={{ marginTop: 8 }}
      >
        Читать
      </Button>
    }

    if (itsme) {
      followButton = null
    }

    followButton = null
    return (<Div
      id={user._id} style={{ textAlign: 'center', marginTop: 8 }}
      className='user-info-item'
    >
      <Avatar
        size={80}
        src={user.profile.image}
        style={{ margin: '0 auto' }}
        onClick={this.props.go}
        data-view='userpage'
        data-panel='userpage'
        data-userid={user._id}
        data-username={user.username}
        data-headertitle={user.profile.name}
      >
        <Icon24Favorite fill='#FFFFFF' />
      </Avatar>
      <h2
        style={{ marginBottom: '8px' }}
        onClick={this.props.go}
        data-view='userpage'
        data-panel='userpage'
        data-userid={user._id}
        data-username={user.username}
        data-headertitle={user.profile.name}
      >
        {user.profile.name}
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
        <span style={{ margin: '0 8px' }}>
          <Icon24Copy />
          {user.stats.postsCount}
        </span>
        <span style={{ margin: '0 8px' }}>
          <Icon24Users />
          {user.stats.followersCount}
        </span>
      </div>
      <Cell multiline>
        {shortBio}
      </Cell>
      {followButton}
    </Div>)
  }
}

export default UsersInfoItem
