import React, { Component } from 'react'
import { Group, Avatar, Cell, Link } from '@vkontakte/vkui'

class PostsListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  goToPost = () => {
    
  }

  render () {
    const { post } = this.props
    const coverImg = post.coverImg ? post.coverImg.replace('_full_', '_thumb_') : null
    return (<Group id={post._id}>
      <Cell
        size='l'
        description={'от ' + post.author.profile.name}
        before={<Avatar size={36} src={post.author.profile.image} />}
        onClick={this.goToPost}
      >
        {post.title}
      </Cell>
      <Cell
        size='l'
        asideContent={<Avatar size={80} type='image' src={coverImg} />}
        onClick={this.goToPost}
        multiline
      >
        {post.excerpt.replace(/<br\s*\/>/gi, '\n\r')}
      </Cell>
      <Cell
        onClick={this.goToPost}
      >
        <Link onClick={this.goToPost}>Читать далее</Link>
      </Cell>
    </Group>)
  }
}

export default PostsListItem
