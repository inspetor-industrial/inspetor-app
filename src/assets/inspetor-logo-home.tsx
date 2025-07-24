import { Waves } from './waves'

export function InspetorLogoHome() {
  return (
    <div className="bg-zinc-950 size-64 rounded-full relative flex flex-col items-center justify-center">
      <Waves className="size-40" width={256} height={256} />
      <div className="bg-background w-64 text-center -mt-8">
        <span className="font-serif italic text-black dark:text-white text-lg font-bold">
          Inspetor Industrial
        </span>
      </div>
    </div>
  )
}
