import { InspetorLogo } from '@ipa/assets/logo'
import { Waves } from '@ipa/assets/waves'

import { LoginForm } from './components/form'

export default async function SignInPage() {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-md">
              <InspetorLogo />
            </div>
            Inspetor Industrial
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col items-center gap-2 text-center mb-6">
              <Waves className="size-auto invert" width={300} height={300} />
              <div className="flex flex-col items-center gap-2 -mt-5">
                <span className="text-2xl font-bold">Inspetor Industrial</span>
                <div className="h-1 w-20 rounded-full bg-zinc-950 dark:bg-zinc-50" />
                <span className="text-muted-foreground text-sm text-balance">
                  Entre com seu email para continuar
                </span>
              </div>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
