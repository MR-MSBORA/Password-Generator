import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if (character) str += "!#$%^&*?|*~"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, number, character])

  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select()
      passwordRef.current.setSelectionRange(0, password.length)
      document.execCommand("copy")
    }
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])

  return (
    <div className="w-full max-w-md bg-gray-700 mx-auto px-4 py-5 my-10 rounded-lg shadow-md text-orange-400">
      <h1 className="text-white text-center text-2xl font-bold">Password Generator</h1>

      <div className="flex items-center shadow-md rounded-lg overflow-hidden my-4">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="w-full bg-white text-black px-3 py-2 outline-none truncate"
          placeholder="Generated Password"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold uppercase hover:bg-blue-400 active:bg-blue-600 transition"
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col space-y-3 text-sm">
        {/* Length Slider */}
        <div className="flex items-center space-x-2">
          <label className="text-white font-medium">Length:</label>
          <input
            type="range"
            min={6}
            max={32}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer"
          />
          <span className="text-white">{length}</span>
        </div>

        {/* Include Numbers */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={number}
            onChange={() => setNumber((prev) => !prev)}
            className="cursor-pointer"
          />
          <label className="text-white">Include Numbers</label>
        </div>

        {/* Include Characters */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={character}
            onChange={() => setCharacter((prev) => !prev)}
            className="cursor-pointer"
          />
          <label className="text-white">Include Special Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
