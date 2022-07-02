/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
  const { file } = req.body
  if (!file) {
    return res.status(400).json({ error: 'File is required' })
  }

  try {
    const API_KEY = process.env.NEXT_PUBLIC_NFTSTORAGE_API
    const API_URL = process.env.NEXT_PUBLIC_NFTSTORAGE_URL
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      // You can add additional params here i.e. SMS, etc.
      // https://developers.klaviyo.com/en/reference/subscribe
      body: JSON.stringify({
        files: [{ file: file }],
      }),
    })
    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error uploading to IPFS.`,
      })
    }
    return res.status(201).json({ error: '' })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
