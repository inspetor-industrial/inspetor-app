'use client'

import { Button } from '@ipa/components/ui/button'
import { ModalEvent } from '@ipa/contants/modal-event'
import { Plus } from 'lucide-react'

export function AddClientButton() {
  return (
    <Button
      className="w-full sm:w-auto"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(ModalEvent.ADD_CLIENT))
      }}
    >
      <Plus className="size-4" />
      Adicionar Cliente
    </Button>
  )
}
