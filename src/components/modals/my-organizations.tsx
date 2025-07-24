'use client'

import { ModalEvent } from '@ipa/contants/modal-event'
import { authClient } from '@ipa/lib/auth.client'
import { cn } from '@ipa/lib/utils'
import { getFirstLetters } from '@ipa/utils/get-first-letters'
import { PencilLine, Trash2 } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Skeleton } from '../ui/skeleton'

export function MyOrganizations() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: organizations, isPending: isLoadingOrganizations } =
    authClient.useListOrganizations()

  const { data: session } = authClient.useSession()

  const [isDeletingOrganization, startDeletingOrganization] = useTransition()

  useEffect(() => {
    function handleOpenMyOrganizationsModal() {
      setIsOpen(true)
    }

    window.addEventListener(
      ModalEvent.MY_ORGANIZATIONS,
      handleOpenMyOrganizationsModal,
    )

    return () => {
      window.removeEventListener(
        ModalEvent.MY_ORGANIZATIONS,
        handleOpenMyOrganizationsModal,
      )
    }
  }, [])

  async function handleDeleteOrganization(organizationId: string) {
    startDeletingOrganization(async () => {
      const response = await authClient.organization.hasPermission({
        organizationId,
      })

      if (response.data?.error || response.error) {
        toast.error('Você não tem permissão para deletar esta empresa')
        return
      }

      await authClient.organization.delete(
        {
          organizationId,
        },
        {
          onError: (error) => {
            toast.error(error.error.message)
          },
          onSuccess: () => {
            toast.success('Empresa deletada com sucesso')

            authClient.organization.setActive({
              organizationId: organizations?.filter(
                (o) => o.id !== organizationId,
              )?.[0]?.id,
            })
          },
        },
      )
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Minhas Empresas</DialogTitle>
          <DialogDescription>
            Gerencie suas empresas aqui e mude a empresa ativa
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isLoadingOrganizations
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-center">
                  <Skeleton className="h-10 w-full" />
                </div>
              ))
            : organizations?.map((org) => (
                <div
                  key={org.id}
                  className="flex items-center justify-between rounded p-4 bg-muted"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 flex items-center justify-center rounded-lg w-10 h-10 text-lg font-normal">
                      {getFirstLetters(org.name)}
                    </div>
                    <div>
                      <div className="font-medium">{org.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {org.slug}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {/* <Button size="icon" variant="outline">
                      <PencilLine className="size-4" />
                    </Button> */}

                    <Button
                      size="icon"
                      variant="destructive"
                      className={cn()}
                      isLoading={isDeletingOrganization}
                      onClick={() => handleDeleteOrganization(org.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
