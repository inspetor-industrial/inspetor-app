import { Input } from '@ipa/components/ui/input'
import { cn } from '@ipa/lib/utils'
import { MailIcon } from 'lucide-react'
import { type ComponentProps, useId } from 'react'

type EmailInputProps = ComponentProps<'input'>

export default function EmailInput({ className, ...props }: EmailInputProps) {
  const id = useId()
  return (
    <div className="relative">
      <Input
        id={id}
        className={cn('peer pe-9', className)}
        type="email"
        {...props}
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
        <MailIcon size={16} aria-hidden="true" />
      </div>
    </div>
  )
}
