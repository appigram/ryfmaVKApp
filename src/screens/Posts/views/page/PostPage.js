import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPostContents } from '../../posts.action'
import CommentsList from '../../../Comments/views/CommentsList'
import UsersInfoItem from '../../../Users/views/UsersInfoItem'
import Notification from '../../../../components/Notification/Notification'
import Loader from '../../../../components/Loader'
import PostNotFound from '../PostNotFound'

import { Group, List, Button, Div, Link } from '@vkontakte/vkui'

import Icon24CommentOutline from '@vkontakte/icons/dist/24/comment_outline'
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline'
import Icon24Like from '@vkontakte/icons/dist/24/like'

import '../styles.css'

class PostPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      likes: 0,
      liked: false,
      hearts: [],
    }
  }

  componentWillMount () {
    console.log('componentWillMount PostPage')
    console.log('props: ', this.props)
    this.props.getPostContents({ postId: this.props.postId })
    window.scrollTo(0, 0)
  }


  likePost = debounce(async () => {
    const { currUser } = this.props
    if (!currUser) {
      Notification.error('Войдите в свой аккаунт, чтобы лайкать посты')
      return
    }
    const { title, userId, _id } = this.props.post
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
      this.setState(prevState => ({
        hearts: [],
        totalLikes: prevState.likes
      }))
    } catch (error) {
      Notification.error(error)
    }
  }, 2000)

  createLikes = () => {
    const {currUser} = this.props
    if (!currUser) {
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
          <i aria-hidden='true' className={`icon heart ${a[Math.floor(Math.random() * 6)]}`}
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

  setNewLike = () => {
    const {currUser} = this.props
    if (!currUser) {
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


  render () {
    const { postInfo, isPendingContentsPostInfo } = this.props

    if (isPendingContentsPostInfo) {
      return (<Loader />)
    }

    if (!postInfo) {
      return (<PostNotFound />)
    }

    const postLikes = this.state.likes
    const postViews = postInfo.viewCount || 0
    const postLiked = this.state.liked

    return (<>
      <Group>
        <Div className='post-page'>
          <h2>{postInfo.title}</h2>
          <img src={postInfo.coverImg} style={{ width: '100%', borderRadius: 6 }} />
          <div dangerouslySetInnerHTML={{ __html: postInfo.htmlBody }} />
          {postInfo.tags && <List className='post-tags'>
            {
              postInfo.tags.map(tag => <span><Link to={`/tags/${tag._id}/${tag.name}`}>{tag.name}</Link></span>)
            }
            </List>
          }
          <div className='tags-hint'>
            <div>
              <b>Вы можете поставить посту от 1 до 50 лайков!</b>
            </div>
          </div>

          <div className='meta post-footer'>
            <div className='post-stat-share'>
              <div key={0} className='like-block'>
                <div
                  className={`post-like-label ui label basic ${postLiked ? 'liked' : ''}`}
                >
                  {postLiked ? (
                    <Icon24Like />
                  ) : (
                    <div className='like-container'>
                      <Icon24LikeOutline />
                      <div className='pulse-ring' />
                    </div>
                  )}
                  <div className='hearts'>
                    {this.state.hearts.map((heart) => heart.content)}
                  </div>
                </div>
                <Link
                  to={`/p/${postInfo._id}/${postInfo.slug}/likers`}
                  className='likers-count'>
                  {postLikes}
                </Link>
              </div>
              <div key={1} className='stats-block'>
                <a
                  href='#comments'
                  className='ui label basic post-comment-label'>
                  <Icon24CommentOutline />
                  <span>{postInfo.commentsCount}</span>
                </a>
              </div>
            </div>
          </div>
          {postInfo.author && <UsersInfoItem user={postInfo.author} go={this.props.go} isPost isShortBio />}
        </Div>
      </Group>
      <CommentsList
        author={postInfo.author}
        objectType='post'
        objectId={postInfo._id}
        title={postInfo.title}
        commentsCount={postInfo.commentsCount}
      />
    </>
    )
  }
}

function mapStateToProps (state) {
  console.log('mapStateToProps')
  console.log(state)
  return {
    postInfo: state.posts.postInfo,
    isPendingContentsPostInfo: state.posts.isPendingContentsPostInfo

  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getPostContents
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
