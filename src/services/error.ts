import { get as loGet } from 'lodash-es'

export default function handleError(err: any) {
  return loGet(err, 'response.data',
    loGet(err, 'response',
      loGet(err, 'message', err)
    )
  )
}