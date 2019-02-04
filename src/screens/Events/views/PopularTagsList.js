'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPopularTagsFunc } from '../tags.action'

import { Group, Header, HorizontalScroll } from '@vkontakte/vkui'

import Loader from '../../../components/Loader'
import EmptyTags from './EmptyTags'

import './styles.css'

class PopularTagsList extends React.Component {
  componentWillMount () {
    this.props.getPopularTagsFunc({
      limit: 20
    })
  }

  render () {
    const { popularTags, isPendingPopularTags } = this.props

    if (isPendingPopularTags) {
      return (<Loader />)
    }

    if (popularTags.length === 0) {
      return <EmptyTags />
    }

    const tags = popularTags.map(tag => {
      if (
        tag._id === 'Pqay8ZqcpBAXrxjGP' ||
        tag._id === 'Wtd8LFGZRivNu3Dii' ||
        tag._id === 'm8ddReksPMkG2sTAq'
      ) return null

      let tagName = tag.name

      if (tag._id === 'uR29TLgWrvEJRv2PX') {
        tagName = 'Стихи о жизни'
      } else if (tag._id === 'Pqay8ZqcpBAXrxjGP') {
        tagName = 'Стихи о любви'
      } else if (tag._id === 'ZnDTJawrfgKXGhTE9') {
        tagName = 'Лирика'
      } else if (tag._id === 'FAG88rmdWg5Jmvd5Y') {
        tagName = 'Стихи о войне'
      } else if (tag._id === 'Tou7gKQG9zYjZ3pEC') {
        tagName = 'Любовная лирика'
      } else if (tag._id === 'Ka4y3Tg8Gk26qfzsw') {
        tagName = 'Стихи любимому'
      } else if (tag._id === 'S6Qjou3daD4HtSAJw') {
        tagName = 'Чувственные стихи'
      } else if (tag._id === '6CYGe5HrqT72ixHeE') {
        tagName = 'Стихи о женщине'
      } else if (tag._id === 'J4xMSfKe5kZyYK2NL') {
        tagName = 'Стихи о душе'
      }

      return (
        <div key={tag._id} className='tag-item'>
          <div className='tag-image'>
            <img src={tag.coverImg} />
          </div>
          <div className='tag-name'>
            {tagName.replace('#', '')}
          </div>
        </div>
      )
    })

    console.log('tags: ', tags)
    return (<Group className='popular-tags' style={{ paddingBottom: 8 }}>
      <Header level='2'>Популярные теги</Header>
      <HorizontalScroll>
        <div style={{ display: 'flex' }}>
          {tags}
          <div key={0} className='tag-item'>
            <div className='tag-name' style={{ margin: '8px 16px' }}>
              <h3>Больше</h3>
            </div>
          </div>
        </div>
      </HorizontalScroll>
    </Group>)
  }
}

function mapStateToProps (state) {
  console.log('mapStateToProps')
  console.log(state)
  return {
    popularTags: state.tags.popularTags,
    isPendingPopularTags: state.tags.isPendingPopularTags

  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getPopularTagsFunc
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(PopularTagsList)
