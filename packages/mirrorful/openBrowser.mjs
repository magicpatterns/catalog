import open from 'open'
export default async function openBrowser() {
  console.log('running browser')
  const res = await open('http://localhost:5050')
  console.log(res)
}

void openBrowser()
