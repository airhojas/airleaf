import { cache } from 'react'
import { headers } from 'next/dist/client/components/headers'

import { REQUEST_QUERY } from '~/constants/system'
import { attachUAAndRealIp } from '~/lib/attach-ua'
import { getQueryClient } from '~/lib/query-client.server'
import { requestErrorHandler } from '~/lib/request.server'
import { queries } from '~/queries/definition'

export const getData = cache(async (params: { id: string }) => {
  attachUAAndRealIp()
  const header = headers()
  const searchParams = new URLSearchParams(header.get(REQUEST_QUERY) || '')
  const id = params.id
  const query = queries.note.byNid(
    id,
    searchParams.get('password') || undefined,
  )
  const data = await getQueryClient()
    .fetchQuery(query)
    .catch(requestErrorHandler)
  return data
})
