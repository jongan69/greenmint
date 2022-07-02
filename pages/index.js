import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import { truncate } from '@/lib/utils/truncate'
import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const address = useAddress()
  const connectWithMetamask = useMetamask()
  const disconnectWallet = useDisconnect()

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
                Welcome
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
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Now lets look at some mining data...
          </p>
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
