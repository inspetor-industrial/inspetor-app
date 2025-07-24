'use client'

import { useRouter } from '@bprogress/next'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserAction } from '@ipa/actions/update-user'
import { Avatar, AvatarFallback, AvatarImage } from '@ipa/components/ui/avatar'
import { Button } from '@ipa/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ipa/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ipa/components/ui/form'
import { Input } from '@ipa/components/ui/input'
import { Textarea } from '@ipa/components/ui/textarea'
import { getFirstLetters } from '@ipa/utils/get-first-letters'
import { Edit3 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useServerAction } from 'zsa-react'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers and underscores',
    ),
  email: z.email('Please enter a valid email'),
  bio: z.string().max(300, 'Bio must be less than 300 characters').optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface EditProfileModalProps {
  user: {
    id: string
    name: string
    email: string
    username: string
    bio: string
    avatar: string
  }
}

export function EditProfileModal({ user }: EditProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const { execute, isPending } = useServerAction(updateUserAction)

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
    },
  })

  async function onSubmit(data: ProfileFormData) {
    try {
      const [result, resultError] = await execute({
        userId: user.id,
        name: data.name,
        username: data.username,
        bio: data.bio,
      })

      if (resultError) {
        console.error(resultError)
        toast.error('Falha ao atualizar perfil. Por favor, tente novamente.')
        return
      }

      toast.success('Perfil atualizado com sucesso!')
      setIsOpen(false)
      router.refresh()
    } catch (error) {
      toast.error('Falha ao atualizar perfil. Por favor, tente novamente.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-inspetor-primary text-white px-6 transition-all duration-200 hover:scale-105">
          <Edit3 className="size-4" />
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Editar perfil
          </DialogTitle>
          <DialogDescription>
            Atualize suas informações de perfil. As alterações serão refletidas
            em toda a plataforma.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="size-24 border-4 border-background shadow-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {getFirstLetters(user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome completo"
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          @
                        </span>
                        <Input
                          placeholder="Digite seu usuário"
                          className="pl-8 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Endereço de email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu email"
                        type="email"
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Biografia</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite sua biografia"
                        className="min-h-[100px] resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <FormMessage />
                      <span className="text-xs text-muted-foreground">
                        {field.value?.length || 0}/300
                      </span>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="transition-all duration-200 hover:scale-105"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                isLoading={form.formState.isSubmitting}
                className="bg-inspetor-primary text-white px-8 transition-all duration-200 hover:scale-105"
              >
                {form.formState.isSubmitting ? 'Salvando' : 'Salvar alterações'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
