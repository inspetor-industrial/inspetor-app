'use server'

import { prisma } from '@ipa/lib/prisma'
import z4 from 'zod/v4'

import { authProcedure } from './procedures/auth'

export const updateUserAction = authProcedure
  .createServerAction()
  .input(
    z4.object({
      userId: z4.string(),
      name: z4.string().optional(),
      username: z4.string().optional(),
      bio: z4.string().optional(),
    }),
  )
  .handler(async ({ input }) => {
    await prisma.user.update({
      where: {
        id: input.userId,
      },
      data: {
        name: input.name ?? undefined,
        username: input.username ?? undefined,
        bio: input.bio ?? undefined,
      },
    })
  })
