import './App.css'
import {useState, useEffect} from 'react'


function App() {

  const [search, setSearch] = useState("https://github.com/Adnantahir-98")
  const [image, setImage] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const API_KEY = "137a4df985a24e0c9f075c97626cbb8e"
  const URL = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${search}&full_page="true"&fresh="true"`

  const getScreenshots = async () => {
    setSearch("")
    setError(false)
    setLoading(true)
    const response = await fetch(URL)
    if(response.ok){
      setImage(response)
      setLoading(false)
    }else{
      setError(true)
    }
  }

  const searchScreenshots = (e) => {
    e.preventDefault()
    getScreenshots()
  }

  useEffect(() => {
    setSearch("")
    getScreenshots()
  }, [])

  return (
    <div className="App">
      <nav>
        <div className='container'>
          <form onSubmit={searchScreenshots}>
            <input autoFocus type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
            <button type='submit'>Take Screenshot</button>
          </form>
        </div>
      </nav>
      <small style={{color: "#ddd"}}>Be Patient Screenshot will take a minute to load the desire page</small>
      <div className='hero'>
        {!loading && !error ? (
          <div className='container'>
            {image && (
              <>
                <a href={image.url} download="Screenshot.png" target="_blank">Download</a>                
                <img src={image.url} alt="background" loading='lazy' />
              </>
            )}
          </div>
        ) : !error && loading ? (
          <div className='loading'></div>
        ) : error ? (
          <div className='container'>
            <h2>Please enter a valid url</h2>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
