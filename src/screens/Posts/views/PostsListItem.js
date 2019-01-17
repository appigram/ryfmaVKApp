import React, { Component } from 'react'
import { Group, Div, Avatar, Cell, Link } from '@vkontakte/vkui'
import './styles.css'

class PostsListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    const { post } = this.props
    const coverImg = post.coverImg ? post.coverImg.replace('_full_', '_thumb_') : null
    if (!post.author) return null
    const excerpt = post.excerpt// .replace(/<br\s*\/>/gi, '\n\r').replace(/<p>/gi, '').replace(/<\/p>/gi, '')
    return (<Group id={post._id} className='post-list-item'>
      <Cell
        size='l'
        description={'от ' + post.author.profile.name}
        before={<Avatar size={36} src={post.author.profile.image} />}
        onClick={this.props.go}
        data-view='postpage'
        data-panel='postpage'
        data-postid={post._id}
      >
        {post.title}
      </Cell>
      <Div
        className='content'
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
        onClick={this.props.go}
        data-view='postpage'
        data-panel='postpage'
        data-postid={post._id}
      >
        <div dangerouslySetInnerHTML={{ __html: excerpt }} />
        {coverImg && <Avatar size={80} type='image' src={coverImg} />}
      </Div>
      <Cell
        onClick={this.props.go}
        data-view='postpage'
        data-panel='postpage'
        data-postid={post._id}
      >
        <Link onClick={this.goToPost}>Читать далее</Link>
      </Cell>
    </Group>)
  }
}

export default PostsListItem
