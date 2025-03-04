import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'
function App() {
  const [count, setCount] = useState(0)
  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(false)
  const [character, setcharacter] = useState(false)
  const [password, setpassword] = useState("")


  const passwordRef = useRef(null) //SPECIAL HOOK USED FOR ADDING OPTIMIZATION IN  CODE FOR COPYING THE PASSWORD 

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) {
      str += "0123456789"
    }
    if (character) { str += "!#$%^&*?|*~" }

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)
  }, [length, number, character, setpassword])


  const copyclip = useCallback(() => {
    passwordRef.current?.select(); //ADD OPTIMIZATION BY HIGHLIGHTING COPIED TEXT & to change the HIGHLIGHT COLOR USE SELECTION: IN SELECTED TAG
  //  passwordRef.current?.setSelectionRange(0,3); //USED TO SELECT SPECIFIED NUMBER OF CHARACTER FROM THE PASSWORD
    window.navigator.clipboard.writeText(password)  //USED TO COPY PASSWORD 
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])







  return (
    <>
      <div className=' w-full max-w-md bg-gray-600 mx-auto px-4 py-3 my-8  rounded-md shadow text-orange-500' >
        <h1 className='text-white text-center my-3 text-2xl'>
          Password
        </h1>

        <div className='flex item-center shadow rounded-lg overflow-hidden  my-2'>
          <input
            type="text"
            value={password}
            placeholder='Password'
            className='outline-none w-full py-1 px-3 bg-white selection:bg-blue-300'
            readOnly
            ref={passwordRef} />
          <button
            className='px-4 py-1 bg-blue-500 uppercase outline-none shrink-0 text-white hover:bg-blue-300 active:bg-blue-300 active:text-black font-bold'
            onClick={copyclip}
          >
            copy
          </button>
        </div>

        <div className='flex   text-sm gap-x-2'>

          <div className=' flex item-center gap-x-1'>
            <input
              type="range"
              value={length}
              min={6}
              max={100}
              className='cursor-pointer outline-none'
              onChange={(e) => {
                setlength(e.target.value)
              }}
            />
            <label
              className='px-1 pr-2 mb-2 '>
              Length : {length}
            </label>
          </div>

          <div className='flex item-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={number}
              onChange={() => {
                setnumber((prev) => !prev)
              }}
            />
            <label
              htmlFor='numberInput'
              className='px-1 pr-2'>
              Number
            </label>
          </div>

          <div className='flex item-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={character}
              id='characterInput'
              onChange={() => {
                setcharacter((prev) => !prev)
              }}
            />
            <label
              htmlFor='characterInput'
              className='px-1 pr-2'>
              Character
            </label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
