const NODES_ENDPOINT = 'https://proofs-api.zerolabs.green/api/partners/filecoin/nodes'

class NodesApi {
  /* This get request will get the list of houses from API * This is the Read in Crud */
  get = async () => {
    try {
      console.log('inside try block for fetching Nodes')
      const resp = await fetch(NODES_ENDPOINT)
      const data = await resp.json()
      console.log('Nodes Found: ', data?.total)
      return data
    } catch (e) {
      console.log('oops, looks like fetchNodes had an issue.', e)
    }
  }

  /*
  This put request will add new rooms or delete rooms from our house
	This corresponds to Update in CRUD
	*/

  // put = async (house) => {
  //   try {
  //     console.log('inside try block for updating houses')
  //     console.log(house)
  //     console.log('Houses Endpoint: ' + NODES_ENDPOINT + house._id)
  //     const resp = await fetch(`${NODES_ENDPOINT}/${house._id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(house),
  //     })
  //     console.log('body is: ' + JSON.stringify(house))
  //     console.log('resp.json is' + resp.json())
  //     return await resp.json()
  //   } catch (e) {
  //     console.log('oops, looks like we had an issue updating our house .', e)
  //   }
  // }

  // this video has helpful tips specifically the body section
  // https://www.youtube.com/watch?v=cuEtnrL9-H0&t=206s
  // I needed to pass an object with a key value pair, not just the name
  // was having trouble getting this to work during office hours

  // create = async (house) => {
  //   console.log('got inside create')
  //   console.log('at this point, house is: ' + house)
  //   console.log('json.stringify(house) is: ')
  //   console.log(JSON.stringify(house))
  //   try {
  //     console.log(`${NODES_ENDPOINT}`)
  //     const resp = await fetch(`${NODES_ENDPOINT}/`, {
  //       method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //       mode: 'cors', // no-cors, *cors, same-origin
  //       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //       credentials: 'same-origin', // include, *same
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: house,
  //       }),
  //     })

  //     console.log('resp is: ')
  //     console.log(resp)
  //     return await resp.json()
  //   } catch (e) {
  //     console.log('error with create')
  //     console.log('e is: ')
  //     console.log(e)
  //   }
  // }
}

export const nodesApi = new NodesApi()
