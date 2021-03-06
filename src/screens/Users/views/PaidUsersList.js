import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPaidUsers } from '../../Users/users.action'
import Loader from '../../../components/Loader'

import Icon24Favorite from '@vkontakte/icons/dist/24/favorite'

import { HorizontalScroll, Group, Header, Avatar } from '@vkontakte/vkui'

import './styles.css'

class PaidUsersList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keyword: '',
      activeTab: 'users',
      searchResult: []
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
    this.props.getPaidUsers({

    })
  }

  goToUser = (e) => {
    console.log('Go to user', this.props.user)
    console.log('Event data: ', e)
    this.props.go(e)
  }

  render () {
    const { paidUsers, isPendingPaidUsers } = this.props

    const itemStyle = {
      flexShrink: 0,
      width: 80,
      height: 120,
      display: 'flex',
      flexDirection:
      'column',
      alignItems: 'center',
      fontSize: 12,
      textAlign: 'center'
    }

    return (<Group style={{ paddingBottom: 8 }}>
      <Header level='2'>Премиум авторы</Header>
      <HorizontalScroll>
        <div style={{ display: 'flex' }} className='paid-users'>
          {isPendingPaidUsers && <Loader />}
          {!isPendingPaidUsers && paidUsers.map(user => {
            return <div
              style={{ ...itemStyle, paddingLeft: 4 }}
              onClick={this.goToUser}
              data-view='userpage'
              data-panel='userpage'
              data-userid={user._id}
              data-username={user.username}
              data-headertitle={user.profile.name}
            >
              <Avatar src={user.profile.image} size={64} style={{ marginBottom: 8 }} className='medium-avatar'>
                <Icon24Favorite fill='#FFFFFF' size={14} />
              </Avatar>
              {user.profile.name}
            </div>
          })}
        </div>
      </HorizontalScroll>
    </Group>
    )
  }
}

function mapStateToProps (state) {
  console.log('mapStateToProps')
  console.log(state)
  return {
    paidUsers: state.users.paidUsers,
    isPendingPaidUsers: state.users.isPendingPaidUsers
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getPaidUsers
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(PaidUsersList)
