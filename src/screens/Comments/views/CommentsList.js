import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCommentsFunc } from '../comments.action'
import Loader from '../../../components/Loader'
import CommentItem from './CommentItem'
import EmptyComments from './EmptyComments'

import { Group, List, Button, Div } from '@vkontakte/vkui'

class CommentsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: [],
      activeTab: 'latest',
      lastType: props.type,
      duration: props.duration
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
    console.log('props: ', this.props)
    const { objectId, parentId, festId, skip, limit } = this.props
    this.props.getCommentsFunc({
      objectId, parentId, festId, skip, limit
    })
  }

  fetchMoreComments = ({ activeTab, replaceFeed, skip }) => () => {
    const { objectId, parentId, festId, skip, limit } = this.props
    this.props.getCommentsFunc({
      objectId, parentId, festId, skip, limit
    })
  }

  render () {
    const { comments, isPendingComments } = this.props

    console.log('comments: ', comments)
    if (isPendingComments) {
      return (<Loader />)
    }

    if (comments.length === 0) {
      return (<Group>
        <EmptyComments />
      </Group>)
    }

    return (<Group className='comments-list'>
      <Div>
        <h3>Комментарии ({comments.length})</h3>
      </Div>
      <List>
        {comments.map(comment =>
          <CommentItem
            key={comment._id}
            comment={comment}
            go={this.props.go}
          />
        )}
        {this.state.comments.length > 0 && <Div>
          <Button size='xl' level='secondary' onClick={this.fetchMoreComments({ activeTab: this.state.activeTab, replaceFeed: false, skip: this.state.comments.length })}>Загрузить еще</Button>
        </Div>}
      </List>
    </Group>)
  }
}

function mapStateToProps (state) {
  console.log('mapStateToProps')
  console.log(state)
  return {
    comments: state.comments.comments,
    isPendingComments: state.comments.isPendingComments

  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCommentsFunc
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)
