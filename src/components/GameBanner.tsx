interface GameProps {
  bannerUrl: string
  title: string
  ads: number
}

export const GameBanner = (data: GameProps) => {
  return (
    <a href='' className='relative rounded-lg overflow-hidden' >
      <img src={data.bannerUrl} />

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
        <strong className='font-bold text-white block'>{data.title}</strong>
        <span className='text-zinc-300 text-sm block'>{data.ads} anúncios</span>
      </div>
    </a>
  )
}