import { useState } from 'react'
import './App.css'
import UseActionStateHook from './components/UseActionStateHook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{backgroundColor:'#fff',width:'100vw',height:'100vh'}}>
      <UseActionStateHook></UseActionStateHook>
     
       
    </div>
  )
}

export default App
