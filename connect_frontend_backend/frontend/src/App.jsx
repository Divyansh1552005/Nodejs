import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"



function App() {
  const [jokes,setJokes] = useState([])
  // since hame application load hote hi data chayie so we will be using useEffect
  useEffect(()=>{
    axios.get("http://localhost:3000/jokes")
    .then((res)=>{
      // console.log(res.data)
      setJokes(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [])


  return (
    <>
      <h1>Joke Generator</h1>
      <p> JOKES : {jokes.length}</p>

      {
        jokes.map((joke) => (
          <div key={joke.id}> 
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>
        ))
      }
    </>

  )
}

export default App
