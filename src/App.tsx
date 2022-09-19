import { useEffect, useState } from 'react'
import { GameBanner } from './components/GameBanner'
import * as Dialog from '@radix-ui/react-dialog'
import './styles/main.css'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'

export interface Game {
  id: string
  title: string
  banneuUrl: string
  _count: {
    ads: number
  }
}
 
function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('https://nlw-esports-ignite-api.herokuapp.com/games')
    .then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src="/Logo.png" alt="" />
      <h1 
          className='text-6xl text-white font-black mt-20'
      >
        Seu <span className='text-transparent bg-clip-text bg-nlw-gradient'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((data, index)=> (
          <GameBanner key={index} bannerUrl={data.banneuUrl} ads={data._count.ads} title={data.title} />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App