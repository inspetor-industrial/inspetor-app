'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { createClientAction } from '@ipa/actions/create-client'
import { Button } from '@ipa/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@ipa/components/ui/dialog'
import { Input } from '@ipa/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ipa/components/ui/select'
import { Textarea } from '@ipa/components/ui/textarea'
import { brazilianStates } from '@ipa/contants/brazil-states'
import { ModalEvent } from '@ipa/contants/modal-event'
import { Building2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z4 from 'zod/v4'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

const schema = z4.object({
  companyName: z4.string().min(1, 'Razão social é obrigatória'),
  document: z4.string().min(1, 'CNPJ é obrigatório'),
  state: z4.string().min(1, 'Estado é obrigatório'),
  city: z4.string().min(1, 'Cidade é obrigatória'),
  state_registration: z4.string().min(1, 'Inscrição estadual é obrigatória'),
  address: z4.string().min(1, 'Endereço é obrigatório'),
  cep: z4.string().min(1, 'CEP é obrigatório'),
  phone: z4.string().min(1, 'Telefone é obrigatório'),
})

type Schema = z4.infer<typeof schema>

export function AddClientModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: '',
      document: '',
      state: '',
      city: '',
      state_registration: '',
      address: '',
      cep: '',
      phone: '',
    },
  })

  const formatDocument = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')

    // Aplica máscara de CNPJ (XX.XXX.XXX/XXXX-XX)
    if (numbers.length <= 14) {
      return numbers
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    }

    return value
  }

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')

    // Aplica máscara de telefone ((XX) XXXXX-XXXX)
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
    }

    return value
  }

  const formatCep = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')

    // Aplica máscara de CEP (XXXXX-XXX)
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d)/, '$1-$2')
    }

    return value
  }

  async function handleSubmit(formData: Schema) {
    try {
      await createClientAction({
        ...formData,
        document: formData.document.replace(/\D/g, ''),
        cep: formData.cep.replace(/\D/g, ''),
        phone: formData.phone.replace(/\D/g, ''),
      })

      toast.success(
        'Cliente criado com sucesso! O cliente foi adicionado à sua lista.',
      )
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Erro ao criar cliente. Tente novamente.',
      )
    }
  }

  useEffect(() => {
    function handleOpenAddClientModal() {
      setIsModalOpen(true)
    }

    window.addEventListener(ModalEvent.ADD_CLIENT, handleOpenAddClientModal)

    return () => {
      window.removeEventListener(
        ModalEvent.ADD_CLIENT,
        handleOpenAddClientModal,
      )
    }
  }, [])

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Adicionar Novo Cliente
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do cliente para cadastrá-lo no sistema.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="add-client-modal-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome da empresa" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1">
                  <FormLabel>CNPJ</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(formatDocument(e.target.value))
                      }}
                      placeholder="00.000.000/0000-00"
                      maxLength={18}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state_registration"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1">
                  <FormLabel>Inscrição Estadual</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite a inscrição estadual"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1">
                  <FormLabel>Estado</FormLabel>

                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {brazilianStates.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1">
                  <FormLabel>Cidade</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="Digite a cidade" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1">
                  <FormLabel>CEP</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(formatCep(e.target.value))
                      }}
                      placeholder="Digite o CEP"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1">
                  <FormLabel>Telefone</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(formatPhone(e.target.value))
                      }}
                      placeholder="Digite o telefone"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Endereço</FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Digite o endereço"
                      rows={3}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsModalOpen(false)
              form.reset({
                companyName: '',
                document: '',
                state: '',
                city: '',
                state_registration: '',
                address: '',
                cep: '',
              })
            }}
            disabled={form.formState.isSubmitting}
          >
            <X className="size-4" />
            Cancelar
          </Button>
          <Button
            form="add-client-modal-form"
            isLoading={form.formState.isSubmitting}
            type="submit"
          >
            Criar Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
