import gql from 'graphql-tag'

export const insertTag = gql`
  mutation insertTag(
    $name: String!,
    $slug: String!,
  ) {
    insertTag(
      name: $name,
      slug: $slug,
    ){
      _id
    }
  }
`

export const deleteTag = gql`
  mutation deleteTag($_id: ID!) {
    deleteTag(
      _id: $_id
    ){
      _id
    }
  }
`
