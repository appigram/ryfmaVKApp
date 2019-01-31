'use strict'

import React from 'react'
import debounce from 'lodash.debounce'
import { Notification } from '../../../components/Notification/Notification'
import { Group, Div, Avatar, Cell, Link } from '@vkontakte/vkui'
// import CommentsList from '../../../Comments/views/CommentsList'
// import Slider from 'react-rangeslider'
import ReactGA from 'react-ga'

import './styles.css'

class ContestPostItem extends React.Component {
  constructor (props) {
    super(props)
    const currUserId = props.currUserId
    const juryRating = this.props.post.juryStats
    let rating = 0
    if (juryRating) {
      for (let i = 0; i < juryRating.length; i++) {
        if (juryRating[i].userId === currUserId) {
          rating = juryRating[i].rating
        }
      }
    }

    const {
      liked,
      currUserLikes
    } = props.post.post
    this.state = {
      showFull: false,
      showComments: props.showComments,
      sliderValue: rating,
      changeRating: rating,
      likes: props.post.likeCount,
      liked: liked,
      totalLikes: currUserLikes === 0 && liked ? 1 : currUserLikes,
      currUserLikes: currUserLikes === 0 && liked ? 1 : currUserLikes,
      hearts: [],
      isAdultContent: props.post.post.isAdultContent,
    }
  }

  async componentDidMount () {
    try {
      if (this.props.post.post._id) {
        await this.props.increasePostViewCount({
          _id: this.props.post.post._id
        })
      }
    } catch (err) {}
  }

  handleChange = (value) => {
    this.setState({
      sliderValue: value
    })
  }

  handleChangeComplete = debounce(async () => {
    const currUserId = this.props.currUserId
    if (!currUserId || !this.props.isJury) {
      Notification.error('Войдите в свой аккаунт, чтобы оценивать посты')
      return
    }
    const { currentLevel } = this.props
    const { userId, _id } = this.props.post
    const { sliderValue, changeRating } = this.state
    try {
      await this.props.rateFestPost({
        festId: this.props.festId,
        postId: _id,
        userId: userId,
        rating: sliderValue,
        changeRating: sliderValue - changeRating,
        level: currentLevel
      })
      ReactGA.event({
        category: 'Contest',
        action: 'JuryRated',
        value: sliderValue
      })
      this.setState({
        rating: sliderValue,
        changeRating: sliderValue
      })
      Notification.success('Оценка успешно поставлена!')
    } catch (error) {
      Notification.error(error)
    }
  }, 500)

  createLikes = () => {
    const currUserId = this.props.currUserId
    if (!currUserId) {
      Notification.error('Войдите в свой аккаунт, чтобы лайкать посты')
      return
    }
    const hearts = this.state.hearts || []
    let currUserLikes = this.state.currUserLikes
    currUserLikes += 1

    const b = Math.floor(Math.random() * 100 + 1)
    const d = ['flowOne', 'flowTwo', 'flowThree']
    const a = ['colOne', 'colTwo', 'colThree', 'colFour', 'colFive', 'colSix']
    const c = (Math.random() * (1.6 - 1.2) + 1.2).toFixed(1)

    hearts.push({
      id: 'part-' + b,
      content: (
        <div
          key={'part-' + b}
          className={`heartAnim part-${b}`}
          style={{
            display: 'block',
            fontSize: Math.floor(Math.random() * (50 - 22) + 22) + 'px',
            animation: d[Math.floor(Math.random() * 3)] + ' ' + c + 's linear'
          }}>
          <i
            name='heart'
            className={`${a[Math.floor(Math.random() * 6)]}`}
          />
        </div>
      )
    })

    this.setState({
      hearts,
      currUserLikes
    })

    setTimeout(() => {
      const index = hearts.map((x) => x.id).indexOf('part-' + b)

      hearts.splice(index, 1)
      this.setState({
        hearts
      })
    }, c * 900)
  }

  likePost = debounce(async () => {
    const currUserId = this.props.currUserId
    if (!currUserId) {
      Notification.error('Войдите в свой аккаунт, чтобы лайкать посты')
      return
    }
    const { title, userId, _id } = this.props.post.post
    const { totalLikes, currUserLikes } = this.state
    const likes = currUserLikes > 50 ? 50 : currUserLikes
    try {
      await this.props.likePost({
        _id,
        title,
        userId,
        totalLikes: likes,
        likes: currUserLikes - totalLikes
      })
      ReactGA.event({
        category: 'Post',
        action: 'PostLiked',
        value: likes
      })
      this.setState({
        hearts: [],
        totalLikes: likes
      })
      setTimeout(() => {
        this.setState({
          hearts: []
        })
      }, 500)
    } catch (error) {
      Notification.error(error)
    }
  }, 2000)

  setNewLike = () => {
    const currUserId = this.props.currUserId
    if (!currUserId) {
      Notification.error(
        'Войдите в свой аккаунт, чтобы лайкать посты'
      )
      return
    }
    if (this.state.currUserLikes < 50) {
      this.createLikes()
      this.setState({
        liked: true,
        likes: this.state.likes + 1
      })
      this.likePost()
    }
  }

  handleComments = () => {
    this.setState({
      showComments: true
    })
  }

  render () {
    const { post } = this.props
    if (!post.author) return null
    const excerpt = post.post.excerpt// .replace(/<br\s*\/>/gi, '\n\r').replace(/<p>/gi, '').replace(/<\/p>/gi, '')
    return (<div id={post._id} className='post-list-item'>
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
        {post.post.title}
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
    </div>)
  }
}

export default ContestPostItem
