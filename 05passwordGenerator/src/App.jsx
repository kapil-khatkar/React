import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
const[num,setNum] =useState(false);
const[char,setChar] =useState(false);
const[password,setPassword]=useState("");

//useRef hook
const passRef = useRef(null)

const passGen = useCallback(()=>{
  let pass = "";
  let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if (num) str += "0123456789"
  if (char) str += "~!@#$%^&*()_+=-[]{}"
  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random()*str.length+1)
    pass += str.charAt(char);
    
  }
  setPassword(pass)

},[length,num,char,setPassword])

const copyPassToClip = useCallback(()=>{
  passRef.current?.select();
  passRef.current?.setSelectionRange(0,3);
  window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
    passGen()
  },[length,num,char,passGen])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>password generator</h1>
     <div className='flex shadow rounded-lg  overflow-hidden mb-4'>
      <input 
      type="text" 
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passRef}
      />
      <button
      onClick={copyPassToClip}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range" 
        min={8}
        max={100}
        id='len'
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label htmlFor='len'>length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
      <input 
        type="checkbox" 
        defaultChecked={num}
        id='numInput'
        onChange={()=>{setNum((prev)=>!prev)
        }}
        />
        <label htmlFor="numInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked={char}
        id='charInput'
        onChange={()=>{setChar((prev)=>!prev);
        }}
        />
        <label htmlFor="charInput">characters</label>
      </div>
     </div>
    </div>
    </>
  )
}

export default App
