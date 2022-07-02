const MINERS_ENDPOINT = 'https://api.filrep.io/api/v1/miners'

class MinersApi {
  /* This get request will get the list of houses from API * This is the Read in Crud */
  get = async () => {
    try {
      console.log('inside try block for fetching Nodes')
      const resp = await fetch(MINERS_ENDPOINT)
      const data = await resp.json()
      console.log('Nodes Found: ', data?.total)
      return data
    } catch (e) {
      console.log('oops, looks like fetchNodes had an issue.', e)
    }
  }
}

export const minersApi = new MinersApi()
