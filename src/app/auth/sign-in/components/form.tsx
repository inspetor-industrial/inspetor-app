'use client'

import { useRouter } from '@bprogress/next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ipa/components/ui/button'
import EmailInput from '@ipa/components/ui/email-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ipa/components/ui/form'
import { Input } from '@ipa/components/ui/input'
import PasswordInput from '@ipa/components/ui/password-input'
import { authClient } from '@ipa/lib/auth.client'
import { cn } from '@ipa/lib/utils'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z4 from 'zod/v4'

const schema = z4.object({
  email: z4.email({
    message: 'Email inválido',
  }),
  password: z4.string().min(8, {
    message: 'Senha deve ter pelo menos 8 caracteres',
  }),
})

type Schema = z4.infer<typeof schema>

export function LoginForm() {
  const router = useRouter()

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignIn(data: Schema) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess(context) {
          toast.success('Login realizado com sucesso!')
          router.push('/')
        },
        onError(error) {
          if (error.error.code === 'INVALID_EMAIL_OR_PASSWORD') {
            toast.error('Email ou senha inválidos')

            form.setError('email', {
              message: 'Email ou senha inválidos',
            })

            return
          }

          toast.error('Ocorreu um erro ao fazer login')
        },
      },
    )
  }

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-2')}
        onSubmit={form.handleSubmit(handleSignIn)}
      >
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <EmailInput placeholder="m@example.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-muted-foreground"
          >
            Forgot your password?
          </Link>

          <Button
            type="submit"
            className="w-full bg-inspetor-primary hover:bg-inspetor-primary/90"
            isLoading={form.formState.isSubmitting}
          >
            Login
          </Button>
        </div>

        {/* <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div> */}
      </form>
    </Form>
  )
}
