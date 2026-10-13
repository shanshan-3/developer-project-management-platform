import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then((res) => {
        if (!res.ok) {
          throw new Error("Backend Request failed");
        }
        return res.json();
      })
      .then((data) => setMessage(data.message))
  }, []);

  return (
    <>
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">
          Developer Project Management Platform
        </h1>

        <p className="mt-4 text-green-400">{message}</p>
      </div>
    </div>
    </>
  )
}

export default App
