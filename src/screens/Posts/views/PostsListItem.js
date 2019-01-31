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
        data-headertitle={post.title}
      >
        {post.title}
      </Cell>
      <Div
        className='content'
        onClick={this.props.go}
        data-view='postpage'
        data-panel='postpage'
        data-postid={post._id}
        data-headertitle={post.title}
      >
        {post.coverImg && <Avatar type='image' src={post.coverImg} className='post-image' />}
        <div dangerouslySetInnerHTML={{ __html: excerpt }} />
      </Div>
      <Cell
        onClick={this.props.go}
        data-view='postpage'
        data-panel='postpage'
        data-postid={post._id}
        data-headertitle={post.title}
      >
        <Link onClick={this.goToPost}>Читать далее</Link>
      </Cell>
    </Group>)
  }
}

export default PostsListItem
