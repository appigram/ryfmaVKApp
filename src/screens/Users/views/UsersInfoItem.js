import React, { Component } from 'react'
import { Group, Avatar, Cell, Button } from '@vkontakte/vkui'

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
    return (<Cell
      id={user._id}
      className='user-info-item'
      before={<Avatar size={36} src={user.profile.image} />}
      description={user.profile.bio}
      asideContent={user.isFollowing ? 
        <Button onClick={this.unFollowUser}>Отписаться</Button>
        :
        <Button onClick={this.followUser}>Читать</Button>}
    >
      {user.profile.name}
    </Cell>)
  }
}

export default UsersInfoItem
