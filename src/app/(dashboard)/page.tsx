import { InspetorLogoHome } from '@ipa/assets/inspetor-logo-home'
import { Button } from '@ipa/components/ui/button'
import { Calendar, FileIcon, UserPlus } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <InspetorLogoHome />

      <div className="flex flex-col gap-2 w-11/12">
        <Link href="schedule">
          <Button className="bg-inspetor-primary w-full">
            <Calendar className="size-4" />
            Agendar inspeção
          </Button>
        </Link>
        <Link href="schedule">
          <Button className="bg-inspetor-primary w-full">
            <UserPlus className="size-4" />
            Cadastrar cliente
          </Button>
        </Link>
        <Link href="schedule">
          <Button className="bg-inspetor-primary w-full">
            <FileIcon className="size-4" />
            Novo relatório
          </Button>
        </Link>
      </div>
    </div>
  )
}
