'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ModalEvent } from '@ipa/contants/modal-event'
import { authClient } from '@ipa/lib/auth.client'
import { slugify } from '@ipa/utils/slug'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z4 from 'zod/v4'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

const schema = z4.object({
  name: z4.string().min(1, { message: 'Nome é obrigatório' }),
})

type Schema = z4.infer<typeof schema>

export function CreateOrganizationModal() {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  })

  async function handleCreateOrganization(formData: Schema) {
    try {
      const slug = slugify(formData.name)
      const { data: session } = await authClient.getSession()

      await authClient.organization.create(
        {
          name: formData.name,
          slug,
          keepCurrentActiveOrganization: true,
          userId: session?.user.id,
        },
        {
          onError: (error) => {
            toast.error(error.error.message)
          },
          onSuccess: () => {
            toast.success('Empresa criada com sucesso')
            setIsOpen(false)
            form.reset()
          },
        },
      )
    } catch (error) {
      toast.error('Erro ao criar empresa')
    }
  }

  useEffect(() => {
    function handleOpenCreateOrganizationModal() {
      setIsOpen(true)
    }

    window.addEventListener(
      ModalEvent.CREATE_ORGANIZATION,
      handleOpenCreateOrganizationModal,
    )

    return () => {
      window.removeEventListener(
        ModalEvent.CREATE_ORGANIZATION,
        handleOpenCreateOrganizationModal,
      )
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Empresa</DialogTitle>
          <DialogDescription>
            Adicione uma nova empresa para gerenciar seus projetos e
            colaboradores.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="create-organization-form"
            onSubmit={form.handleSubmit(handleCreateOrganization)}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome da empresa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Inspetor Industrial"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            isLoading={form.formState.isSubmitting}
            type="submit"
            form="create-organization-form"
          >
            Adicionar Empresa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
