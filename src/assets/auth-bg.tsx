import { cn } from '@ipa/lib/utils'
import Image, { type ImageProps } from 'next/image'

import AuthBgPNG from './raw/application-background.png'

type AuthBgProps = Omit<ImageProps, 'src' | 'alt'>

export function AuthBg({ className, ...props }: AuthBgProps) {
  return (
    <Image
      src={AuthBgPNG}
      alt="Inspetor Industrial App - Auth background"
      fill
      className={cn('object-cover', className)}
      {...props}
    />
  )
}
