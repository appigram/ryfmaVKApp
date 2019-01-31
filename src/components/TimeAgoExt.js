'use strict'

import React from 'react'
import TimeAgo from 'react-timeago'
import russianStrings from 'react-timeago/lib/language-strings/ru'
import englishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

class TimeAgoExt extends React.PureComponent {
  render () {
    const { date, i18n, isComment } = this.props
    let currLang = 'ru'
    if (i18n) {
      currLang = i18n.language
    }
    const formatter = currLang === 'ru' ? buildFormatter(russianStrings) : buildFormatter(englishStrings)
    return (
      <TimeAgo date={date} formatter={formatter} itemProp={isComment ? 'commentTime' : 'datePublished'} />
    )
  }
}

export default TimeAgoExt
