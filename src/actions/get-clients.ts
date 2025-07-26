'use server'

import { prisma } from '@ipa/lib/prisma'
import z4 from 'zod/v4'

import { authProcedure } from './procedures/auth'

export const getClientsAction = authProcedure
  .createServerAction()
  .input(
    z4.object({
      companyName: z4.string().optional(),
      state: z4.string().optional(),
      organizationId: z4.string(),
    }),
  )
  .handler(async ({ input }) => {
    const { companyName, state, organizationId } = input

    const clients = await prisma.clients.findMany({
      where: {
        organizationId,
        ...(companyName && {
          companyName: {
            contains: companyName,
            mode: 'insensitive',
          },
        }),
        ...(state &&
          state !== 'all' && {
            state,
          }),
      },
      orderBy: {
        companyName: 'asc',
      },
    })

    return clients
  })
