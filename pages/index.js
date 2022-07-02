import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
// import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
// import formatDate from '@/lib/utils/formatDate'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import { truncate } from '@/lib/utils/truncate'
import { nodesApi } from 'lib/filecoinnodes.js'
import { minersApi } from 'lib/filecoinminers.js'
import { MinersTable } from '@/components/MinersTable'
import { useEffect, useState } from 'react'
// import NewsletterForm from '@/components/NewsletterForm'
const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const nodes = await nodesApi.get()
  const miners = await minersApi.get()
  // console.log('NODES:', nodes)
  return { props: { posts, nodes, miners } }
}

export default function Home({ posts, nodes, miners }) {
  const [greenMintScores, setGreenMintScores] = useState([])
  const [manystorageContract, setManyStorageContracts] = useState([])
  let [totalFreeSpace, setTotalFreeSpace] = useState([])
  const address = useAddress()
  const connectWithMetamask = useMetamask()
  const disconnectWallet = useDisconnect()

  useEffect(() => {
    if (miners.miners.length > 0) {
      miners?.miners?.forEach((item, index) => {
        if (item?.score > 90) {
          // console.log('Found a score: ', item?.score, 'at ', index)
          greenMintScores.push(item)
        }
      })

      miners?.miners?.forEach((item, index) => {
        if (item?.storageDeals?.total > 1000) {
          // console.log('Found a score: ', item?.score, 'at ', index)
          manystorageContract.push(item)
        }
      })

      miners?.miners?.forEach((item, index) => {
        // eslint-disable-next-line prettier/prettier
        if (item?.freeSpace / 100000000000 > 100) {
          // console.log(
          //   'Found a over 100 Gigabytes Free: ',
          //   item?.freeSpace / 100000000000,
          //   'at ',
          //   index
          // )
          totalFreeSpace.push(miners.miners[index])
        }
      })
    }
  }, [greenMintScores, manystorageContract, miners, totalFreeSpace])

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 p-4 dark:divide-gray-700">
        {address ? (
          <>
            <button
              className={`w-third rounded-md bg-red-500 p-5 py-3 px-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 dark:ring-offset-black sm:py-0`}
              onClick={disconnectWallet}
            >
              Disconnect Wallet
            </button>
            <p>Your address: {truncate(address, 10)}</p>
          </>
        ) : (
          <>
            <div className="space-y-2 pt-6 pb-8 md:space-y-5">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                Green Mint
              </h1>
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                {siteMetadata.description}
              </p>
              <button
                onClick={connectWithMetamask}
                className={`w-third rounded-md bg-green-700 py-2 px-4 font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black sm:py-0`}
              >
                Connect with Metamask
              </button>
            </div>
          </>
        )}
      </div>

      {address && (
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Welcome to Green Mint
          </h1>

          <h3 className="text-m sm:text-m md:text-m font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:leading-14">
            Filecoin Green Stats
          </h3>
          {nodes && address ? (
            <>
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                Total Filecoin Retrieval Miners(Servers): {nodes?.total}
              </p>
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                Total Filecoin Storage Miners (Providers): {miners?.pagination?.total}
              </p>
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                Providers with High Reputation: {greenMintScores?.length}
              </p>
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                Providers With over 1,000 Storage Contracts: {manystorageContract?.length}
              </p>
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                Providers With over 100 Gigabytes Free Space: {totalFreeSpace?.length}
              </p>
              {/* <MinersTable /> */}
            </>
          ) : (
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              Looking for some mining data...
            </p>
          )}
        </div>
      )}
      {address && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-green-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            Learn More &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
