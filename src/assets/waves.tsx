import { cn } from '@ipa/lib/utils'
import Image, { type ImageProps } from 'next/image'

import WavesPNG from './raw/waves.png'

export type WavesProps = Omit<ImageProps, 'src' | 'alt'>

export async function Waves({ className, ...props }: WavesProps) {
  return (
    <Image
      src={WavesPNG}
      alt="Waves"
      width={40}
      height={40}
      className={cn('size-4 object-cover', className)}
      {...props}
    />
  )
}
