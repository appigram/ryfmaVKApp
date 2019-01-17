import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getContestInfo } from '../../contests.action'
import Loader from '../../../../components/Loader'
import ContestNotFound from '../ContestNotFound'
import { parseText } from '../../../../utils/Helpers'

import { Button, Div, Link, Tabs, TabsItem } from '@vkontakte/vkui'

class ContestPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fetchedUser: props.fetchedUser,
      sortType: 'jury',
      showDesc: false,
      minJuryRating: 0,
      amountOfPosts: 0
    }
  }

  componentWillMount () {
    console.log('componentWillMount PostPage')
    this.props.getContestInfo({ slug: this.props.slug, festId: this.props.festId })
  }

  changeSort = (sortType) => (e) => {
    this.setState({ sortType })
  }

  handleDesc = () => {
    this.setState({
      showDesc: !this.state.showDesc
    })
  }

  levelDone = (level) => async () => {
    const { minJuryRating, amountOfPosts } = this.state
    const contestVariables = {
      _id: this.props.contest._id,
      levelDone: level,
      minJuryRating,
      amountOfPosts
    }

    try {
      await this.props.updateContestLevel(contestVariables)
      Notification.success(this.props.t('common:notif.contestUpdated'))
    } catch (error) {
      Notification.error(error)
    }
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  render () {
    const { contest, isPendingContent } = this.props

    if (isPendingContent) {
      return (<Loader />)
    }

    if (!contest) {
      return (<ContestNotFound />)
    }

    const { sortType, minJuryRating, amountOfPosts, fetchedUser } = this.state
    const fest = contest

    if (fest.isFestival) {
      // return <FestivalWrapper fest={fest} location={this.props.location} match={this.props.match} />
    }
    const currentLevel = fest.currentLevel || 1
    const activeLevel = currentLevel

    const currDate = new Date()
    const fromDate = new Date(fest.fromDate)
    const toDate = new Date(fest.toDate)
    const currUserId = fetchedUser ? fetchedUser._id : null
    const currUser = fetchedUser
    const juryIds = contest.juryData.map(jury => jury._id)
    const isJury = juryIds.includes(currUserId)

    const maxChars = 412
    const festDescription = fest.description || ''
    const numSentences = festDescription.split('\n')
    let sentsCounter = 0
    let shortDesc = []
    let restDesc = []
    numSentences.map((text, index) => {
      if (sentsCounter < maxChars) {
        if (text) {
          sentsCounter += text.length
          shortDesc.push(<p key={index} dangerouslySetInnerHTML={{ __html: `${parseText(text)}` }} />)
        } else {
          shortDesc.push(<br key={index} />)
        }
      } else {
        if (text) {
          restDesc.push(<p key={index} dangerouslySetInnerHTML={{ __html: `${parseText(text)}` }} />)
        } else {
          restDesc.push(<br key={index} />)
        }
      }
    })

    const levels = []
    if (fest.levels > 1) {
      for (let i = 1; i < fest.levels; i++) {
        if (i === 1) {
          levels.push(
            <TabsItem
              className={activeLevel === i ? 'level item active' : 'level item'}
            >
              Этап {i} {i < currentLevel ? '(Завершен)' : ''} {i === currentLevel ? 'Текущий' : ''}
            </TabsItem>
          )
        } else {
          levels.push(<TabsItem className={activeLevel === i ? 'level item active' : 'level item'}>
            Этап {i} {i < currentLevel ? '(Завершен)' : ''} {i === currentLevel ? 'Текущий' : ''}
          </TabsItem>)
        }
      }
      levels.push(<TabsItem className={(activeLevel === fest.levels) ? 'level item active' : 'level item'}>
        Финал
      </TabsItem>)
    }

    const isFinal = activeLevel === fest.levels

    return (
      <Div id={contest._id} className='fest-page'>
        {fest.coverImg &&
          <div className='ui image'>
            <img
              className='contest-banner'
              itemProp='image'
              src={fest.coverImg}
              alt={
                fest.genres
                  ? fest.title + '. ' + fest.genres.map((genre) => genre).join(',')
                  : fest.title
              }
            />
          </div>
        }
        {/* <AdvBanner adType='postPage' />
        <Sidebar fest={fest} isMultiLevel={levels.length > 1} currentLevel={currentLevel} /> */}
        {currDate > toDate && <div className={`winners ${sortType}`}>
          <h1>Победители</h1>
          <Tabs type="buttons">
            <TabsItem
              onClick={() => this.setState({ sortType: 'jury' })}
              selected={this.state.sortType === 'jury'}
            >
              Выбор жюри
            </TabsItem>
            <TabsItem
              onClick={() => this.setState({ sortType: 'likes' })}
              selected={this.state.sortType === 'likes'}
            >
              Выбор читателей
            </TabsItem>
          </Tabs>
          {/* <Winners
            festId={fest._id}
            sortType={sortType}
            isFestival={fest.isFestival}
            noJury={fest.noJury}
          /> */}
        </div>}
        <Tabs type="buttons">
          <TabsItem
            selected
          >
            Описание
          </TabsItem>
          <TabsItem>
            Таблица результатов
          </TabsItem>
        </Tabs>

        <h1 itemProp='name'>{fest.title}</h1>
        <div className='contest-body'>
          {festDescription.length > maxChars
            ? <div className='fest-desc'>
              <div className='slide-down' itemProp='description'>
                {shortDesc}
                {!this.state.showDesc && <div className='slide-fade' />}
              </div>
              <div className={this.state.showDesc ? 'slide-down-hidden open' : 'slide-down-hidden'} itemProp='description'>
                {restDesc}
              </div>
              <div className='slide-down-button' onClick={this.handleDesc}>
                {this.state.showDesc ? 'Скрыть' : 'Показать полностью'}
              </div>
            </div>
            : <span itemProp='description'>{shortDesc}</span>
          }
        </div>
        {fest.partners && <div className='partners'>
          <h3>Призы от партнеров</h3>
          <div className='partner-name'>
            {fest.partners[0].logoLink.includes('<svg') ?
              <div className='partner-logo' dangerouslySetInnerHTML={{ __html: fest.partners[0].logoLink }} />
              :
              <img src={fest.partners[0].logoLink} className='partner-logo' />
            }
            <h4>{fest.partners[0].name}</h4>
          </div>
          <div className='partner-brief' dangerouslySetInnerHTML={{ __html: fest.partners[0].brief }} />
          <div className='partner-images'>
            <div className='partner-image'>
              <img src={fest.partners[0].images[0]} />
            </div>
            <div className='partner-image'>
              <img src={fest.partners[0].images[1]} />
            </div>
            <div className='partner-image'>
              <img src={fest.partners[0].images[2]} />
            </div>
          </div>
          <a
            href={`${fest.partners[0].url}?utm_source=ryfma&utm_medium=contest&utm_campaign=partner`}
            target='_blank'
            rel='noopener nofollow'
            className='ui button partner-more'
          >
            Больше призов
          </a>
        </div>}
        {levels.length > 0 && <Tabs type="buttons" className='level-filters'>
          {levels}
        </Tabs>}
        {/* levels.length > 0 && isJury && !isFinal && <Form className='level-actions'>
          <p>Укажите условия для попадания в новый этап конкурса. Или добавьте стихи вручную самостоятельно.</p>
          <Form.Group widths='equal'>
            <Form.Input
              placeholder={t('minJuryRating')}
              value={minJuryRating}
              onChange={this.handleInputChange}
              name='minJuryRating'
              label={t('minJuryRating')}
              type='text'
            />
            <Form.Input
              placeholder={t('amountOfPosts')}
              value={amountOfPosts}
              onChange={this.handleInputChange}
              name='amountOfPosts'
              label={t('amountOfPosts')}
              type='text'
            />
          </Form.Group>
          <Button primary className='level-done' onClick={this.levelDone(activeLevel)}>{t('levelDone')}</Button>
        </Form> */}
        {/* <PostFilters
          fest={fest}
          currentLevel={activeLevel}
          isMultiLevel={levels.length > 1}
          isFinal={isFinal}
          isJury={isJury}
          juryId={currUserId}
          isMobile={isMobileMode}
          currUser={currUser}
        /> */}
      </Div>
    )
  }
}

function mapStateToProps (state) {
  console.log('mapStateToProps')
  console.log(state)
  return {
    contest: state.contests.contest,
    isPendingContent: state.contests.isPendingContent
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getContestInfo
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage)
