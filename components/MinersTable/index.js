import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { NumberParam, StringParam, useQueryParams } from 'use-query-params'
import cn from 'classnames'

import { fetchMinerData } from '../../lib/filrep'
import { defaultDataState } from '../../lib/utils/constant'

import { Table } from '../Table'
// import { formatBytes } from '../../lib/utils/bytes'

import s from './s.module.css'

export const MinersTable = () => {
  const [data, setData] = useState(defaultDataState)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(0)
  const [offset, setOffset] = useState(0)

  // const [query, setQuery] = useQueryParams({
  //   miner: StringParam,
  //   limit: NumberParam,
  //   offset: NumberParam,
  //   start: StringParam,
  //   end: StringParam,
  //   sortBy: StringParam,
  //   order: StringParam,
  // })

  useEffect(() => {
    const abortController = new AbortController()

    // setData((prevProps) => ({ ...prevProps, loading: true }))
    setData(fetchMinerData())
    console.log('Data is: ', data)
    // fetchMiners(abortController, {
    //   limit: query?.limit ?? 10,
    //   offset: query.offset ?? 0,
    //   sortBy: query.sortBy ?? undefined,
    //   order: query.order ?? undefined,
    // })
    //   .then((result) => {
    //     setData({
    //       results: result.miners,
    //       loading: false,
    //       failed: false,
    //     })

    //     setTotal(result.pagination.total)
    //   })
    //   .catch((e) => {
    //     console.error(e)
    //     setData({
    //       results: [],
    //       loading: false,
    //       failed: true,
    //     })
    //   })
  }, [data])

  return (
    <>
      <p> Filecoin Nodes </p>
      {data && (
        <>
          <p> You got data: </p>
          <ul>
            {data?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
      {/* <Table
      title="Storage Providers"
      className={s.table}
      data={data}
      limit={limit ?? 10}
      offset={offset ?? 0}
      total={total}
      columns={[
        {
          title: 'Entitiy',
          key: 'miner',
          width: '50%',
          format: (value) => <span style={{ fontWeight: 600 }}>{value}</span>,
        },
        {
          title: 'Total raw power',
          key: 'power',
          sortKey: 'power',
          align: 'right',
        },
        {
          title: 'Committed capacity',
          key: 'used',
          sortKey: 'used',
          align: 'right',
        },
        {
          title: '',
          key: nanoid(),
          format: (_) => (
            <button type="button" className={cn('button-primary', s.statisticsButton)}>
              View statistics
            </button>
          ),
        },
      ]}
    /> */}
    </>
  )
}
