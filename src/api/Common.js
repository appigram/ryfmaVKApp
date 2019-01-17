import gql from 'graphql-tag'

export const sendVerificationLink = gql`
  mutation sendVerificationLink {
    sendVerificationLink
  }
`

export const removeImageFromS3 = gql`
  mutation removeImageFromS3($imgUrl: String!, $silent: Boolean) {
    removeImageFromS3(
      imgUrl: $imgUrl,
      silent: $silent,
    )
  }
`
