'use server'

import { prisma } from '@ipa/lib/prisma'
import z4 from 'zod/v4'

import { authProcedure } from './procedures/auth'

const createClientSchema = z4.object({
  companyName: z4.string().min(1, 'Razão social é obrigatória'),
  document: z4.string().min(11, 'CNPJ deve ter pelo menos 11 dígitos'),
  state: z4.string().min(2, 'Estado é obrigatório'),
  city: z4.string().min(1, 'Cidade é obrigatória'),
  state_registration: z4.string().min(1, 'Inscrição estadual é obrigatória'),
  address: z4.string().min(1, 'Endereço é obrigatório'),
  cep: z4.string().min(8, 'CEP deve ter pelo menos 8 dígitos'),
  phone: z4.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
})

export const createClientAction = authProcedure
  .createServerAction()
  .input(createClientSchema)
  .handler(async ({ input, ctx }) => {
    const { session } = ctx

    const existingClient = await prisma.clients.findUnique({
      where: {
        document: input.document,
      },
    })

    if (existingClient) {
      throw new Error('Já existe um cliente cadastrado com este CNPJ')
    }

    const organizationId = session.session?.activeOrganizationId
    if (!organizationId) {
      throw new Error('Organização não encontrada')
    }

    const client = await prisma.clients.create({
      data: {
        ...input,
        organizationId,
      },
    })

    return client
  })
