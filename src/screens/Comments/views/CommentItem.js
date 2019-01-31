import React, { Component } from 'react'
import { Avatar, Cell, Div } from '@vkontakte/vkui'
import TimeAgoExt from '../../../components/TimeAgoExt'

import './styles.css'

class UsersInfoItem extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  goToUser = (e) => {
    console.log('Go to comment', this.props.comment)
    console.log('Event data: ', e)
    this.props.go(e)
  }

  followUser = () => {

  }

  unFollowUser = () => {

  }

  render () {
    const { comment } = this.props
    let avatar = comment.author.profile.image || 'https://cdn.ryfma.com/defaults/icons/default_full_avatar.jpg'
    if (avatar.indexOf('_full_') > 0) {
      avatar = avatar.replace('_full_', `_medium_`)
    } else if (avatar.indexOf('graph.facebook.com') > 0) {
      avatar = avatar.replace('=large', '=square')
    }

    /* asideContent={comment.isFollowing ?
      <Button onClick={this.unFollowUser}>Отписаться</Button>
      :
      <Button onClick={this.followUser}>Читать</Button>} */

    return (<div className='comment-item'>
      <Cell
        key={comment._id}
        id={comment._id}
        size='l'
        description={<TimeAgoExt date={comment.postedAt} isComment />}
        before={<Avatar size={36} src={comment.author.profile.image} />}
      >
        {comment.author.profile.name}
      </Cell>
      <Div
        className='content'
      >
        <div dangerouslySetInnerHTML={{ __html: comment.content }} />
      </Div>
    </div>)
  }
}

export default UsersInfoItem
