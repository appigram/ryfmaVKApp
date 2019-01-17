import React from 'react'
import { Group, Cell } from '@vkontakte/vkui'

const EmptySearch = ({goToFunc}) => (
  <Group>
    <Cell>
      Ничего не найдено. Попробуйте изменить запрос
    </Cell>
  </Group>
)

export default EmptySearch
