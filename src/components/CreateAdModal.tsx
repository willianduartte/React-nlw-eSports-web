import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController, CaretDown, CaretUp } from 'phosphor-react'
import { Input } from './Form/Input'
import { FormEvent, useEffect, useState } from 'react'
import { Game } from '../App'
import axios from 'axios';

export const CreateAdModal = () => {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)
  const [gameId, setGameId] = useState('')

  useEffect(() => {
    axios('https://nlw-esports-ignite-api.herokuapp.com/games')
    .then(response => {
      setGames(response.data)
    })
  }, [])

  const handleCreateAd = async (event: FormEvent) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if(!data.name) {
      return
    }

    try {
      await axios.post(`https://nlw-esports-ignite-api.herokuapp.com/games/${gameId}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
    })

    alert("Anúncio criado com sucesso!")
    } catch (err) {
      alert("Erro em criar o anúncio")
      console.log(err)
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
          <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='game' className='font-semibold'>Qual o game?</label>
              <Select.Root onValueChange={(value) => {
                setGameId(value)
              }}>
                <Select.Trigger className='bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 flex justify-between items-center'>
                  <Select.Value placeholder='Selecione o game que deseja jogar' />
                  <Select.Icon>
                    <CaretDown size={24}/>
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className='bg-zinc-900 py-3 px-2 rounded text-sm text-zinc-500 flex justify-between items-center'>
                    <Select.ScrollUpButton>
                        <CaretUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport className='p-1'>
                      <Select.Group>
                        <Select.Label className='text-center'>Jogos</Select.Label>
                        {games.map((data, index)=> (
                          <Select.Item 
                            className='hover:bg-[#2a2634] text-white pl-6 pr-44 relative rounded' 
                            key={index} 
                            value={data.id}
                          >
                            <Select.ItemIndicator className='absolute left-1 top-[3px]'>
                              <Check />
                            </Select.ItemIndicator>
                            <Select.ItemText>{data.title}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                      <Select.ScrollDownButton>
                        <CaretDown />
                      </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='name'> Seu nome (ou nickname)</label>
              <Input name='name' id='name' placeholder='Como te chamam dentro do game?' />
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                <Input name='yearsPlaying' id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='discord'>Qual seu Discord?</label>
                <Input name='discord' id='discord' placeholder='Usuario#0000' />
              </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <ToggleGroup.Root type='multiple' className='grid grid-cols-4 gap-1' onValueChange={setWeekDays} value={weekDays} >
                    <ToggleGroup.Item
                      value='0'
                      title='Domingo'
                      className={`w-10 h-10 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >D</ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='1'
                      title='Segunda'
                      className={`w-10 h-10 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >S</ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='2'
                      title='Terça'
                      className={`w-10 h-10 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >T</ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='3'
                      title='Quarta'
                      className={`w-10 h-10 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >Q</ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='4'
                      title='Quinta'
                      className={`w-10 h-10 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >Q</ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='5'
                      title='Sexta'
                      className={`w-10 h-10 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >S</ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='6'
                      title='Sábado'
                      className={`w-10 h-10 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >S</ToggleGroup.Item>
                  </ToggleGroup.Root>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor='hourStart'>Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input name='hourStart' id='hourStart' type="time" placeholder='De' />
                    <Input name='hourEnd' id='hourEnd' type="time" placeholder='Até' />
                  </div>
                </div>
              </div>

              <label className='mt-2 flex gap-2 text-sm items-center'>
                <Checkbox.Root checked={useVoiceChannel} onCheckedChange={(checked) => {
                  if(checked === true) {
                    setUseVoiceChannel(true)
                  } else {
                    setUseVoiceChannel(false)
                  }
                }} className='w-6 h-6 p-1 rounded bg-zinc-900'>
                  <Checkbox.Indicator>
                    <Check className='w-4 h-4 text-emerald-400' />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close 
                  className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600' 
                  type='button'
                >Cancelar</Dialog.Close>
                <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'>
                  <GameController size={24} />  Encontrar duo
                </button>
              </footer>
          </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}