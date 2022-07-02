import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Pdf from 'react-to-pdf'

// import './styles.css'
const ref = React.createRef()

function PdfToNftMint({ pdfData }) {
  const [refData, setRefData] = useState(ref)
  let {
    title,
    address,
    date,
    description,
    region,
    minerId,
    storageGoal,
    estCost,
    image,
    greenMintScore,
  } = pdfData

  const onMintClick = async () => {
    console.log('PDF MINT : ')

    // 1. Create PDF
    // 2. Upload to NFT.storage
    // 3. Return CID

    // fetch('https://thirdweb-nextjs-minting-api.vercel.app/api/mint', {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     "mintToAddress": connector.accounts[0],
    //     "supply": 1,
    //     "message": prediction.name,
    //     "metadata": {
    //       "name": prediction.name,
    //       "description": 'A Demo Green Rewards NFT',
    //       "image": `ipfs://${IPFS.value.cid}`,
    //       "external_url": `https://${IPFS.value.cid}.ipfs.nftstorage.link`,
    //       "uri": `https://${IPFS.value.cid}.ipfs.dweb.link`,
    //       "background_color": "",
    //       "attributes": [
    //         {
    //           "ai_reading": prediction.name,
    //           "trait_type": "DEMO"
    //         }
    //       ]
    //     }
    //   })
    // return (
    // )
  }

  return (
    <div className="Pdf">
      {pdfData && (
        <>
          <div ref={ref}>
            <h1>{title}</h1>
            <h2>{address}</h2>
            <h2>{date}</h2>
            <h2>{description}</h2>
            <h2>{region}</h2>
            <h2>{minerId}</h2>
            <h2>{storageGoal}</h2>
            <h2>{storageGoal}</h2>
            <h2>{estCost}</h2>
            <h2>{image}</h2>
            <h2>{greenMintScore}</h2>
          </div>
          <Pdf targetRef={ref} filename={`GreenMint.pdf`}>
            {({ toPdf }) => (
              <button onClick={toPdf} style={{ color: 'green' }}>
                Generate Green Mint
              </button>
            )}
          </Pdf>
        </>
      )}
    </div>
  )
}

export default PdfToNftMint
