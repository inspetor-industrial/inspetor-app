import { cn } from '@ipa/lib/utils'
import Image, { type ImageProps } from 'next/image'

import InspetorLogoPNG from './raw/inspetor-logo.png'

export type InspetorLogoProps = Omit<ImageProps, 'src' | 'alt'>

export function InspetorLogo({ className, ...props }: InspetorLogoProps) {
  return (
    <Image
      src={InspetorLogoPNG}
      alt="Inspetor Industrial"
      width={40}
      height={40}
      className={cn('size-4 object-cover', className)}
      {...props}
    />
  )
}
