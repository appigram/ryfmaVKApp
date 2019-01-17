import React, { Component } from 'react'
import { Div, Avatar, Link, Button } from '@vkontakte/vkui'

class ContestsItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }

  viewContest = () => {
    this.props.go()
  }

  render () {
    const { contest } = this.props
    let avatar = contest.coverImg || 'https://cdn.ryfma.com/defaults/icons/default_full_avatar.jpg'
    return (<Div
      id={contest._id}
      onClick={this.props.go}
      data-view='contestpage'
      data-panel='contestpage'
      data-contestid={contest._id}
    >
      <img src={avatar} style={{ width: '100%', borderRadius: '6px' }} />
      <h1 style={{ marginBottom: 0 }}>{contest.title}</h1>
      <div><Link>{contest.author.profile.name}</Link></div>
      <div>{contest.brief}</div>
      <div className='paticipants' style={{ display: 'flex', alignItems: 'center', margin: '12px 0', marginLeft: '12px' }}>
        {contest.usersData[0] && <Link key={contest.usersData[0]._id} to={'/u/' + contest.usersData[0].username} style={{ marginLeft: '-12px' }}>
          <Avatar size={32} src={contest.usersData[0].profile.image.replace('_full_', '_small_')} />
        </Link>}
        {contest.usersData[1] && <Link key={contest.usersData[1]._id} to={'/u/' + contest.usersData[1].username} style={{ marginLeft: '-12px' }}>
          <Avatar size={32} src={contest.usersData[1].profile.image.replace('_full_', '_small_')} />
        </Link>}
        {contest.usersData[2] && <Link key={contest.usersData[2]._id} to={'/u/' + contest.usersData[2].username} style={{ marginLeft: '-12px' }}>
          <Avatar size={32} src={contest.usersData[2].profile.image.replace('_full_', '_small_')} />
        </Link>}
        {contest.stats.usersCount > 3 ?
          <span style={{ marginLeft: '8px' }}>+{contest.stats.usersCount - 3} участников</span>
          :
          (contest.stats.usersCount === 0 ?
            <span style={{ marginLeft: '8px' }}>Нет участников</span>
            :
            null
          )
        }
      </div>
      <Button
        size='xl'
        style={{ marginBottom: '24px' }}
        onClick={this.props.go}
        data-view='contestpage'
        data-panel='contestpage'
        data-contestid={contest._id}
      >
        Узнать
      </Button>
    </Div>)
  }
}

export default ContestsItem
