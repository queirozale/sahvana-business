import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json());

function Profile () {
  const { data, error } = useSWR('/api/findProduct', fetcher)
  {if (data){
    console.log(data)
  }}

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // render data
  return <div>hello {data[0].description}!</div>
}

export default Profile;