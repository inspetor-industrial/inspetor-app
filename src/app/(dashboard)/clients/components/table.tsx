'use client'

import { getClientsAction } from '@ipa/actions/get-clients'
import { Badge } from '@ipa/components/ui/badge'
import { Button } from '@ipa/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@ipa/components/ui/card'
import { Skeleton } from '@ipa/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ipa/components/ui/table'
import { ModalEvent } from '@ipa/contants/modal-event'
import { ReactQueryKeys } from '@ipa/contants/queries'
import { authClient } from '@ipa/lib/auth.client'
import { formatDocument } from '@ipa/utils/format-document'
import { formatPhone } from '@ipa/utils/format-phone'
import type { Clients } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Building2, FileText, MapPin, Phone, Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'

import { TableSkeleton } from './table-skeleton'

export function ClientsTable() {
  const { execute: getClients } = useServerAction(getClientsAction)
  const { data: activeOrganization } = authClient.useActiveOrganization()
  const [search] = useQueryState('search', {
    defaultValue: '',
  })

  const [state] = useQueryState('state', {
    defaultValue: 'all',
  })

  const [page] = useQueryState('page', parseAsInteger.withDefault(1))

  const { data: response, isFetching: isLoading } = useQuery<{
    clients: Clients[]
    total: number
  }>({
    queryKey: ReactQueryKeys.clients.list({
      organizationId: activeOrganization?.id ?? '',
      page,
      limit: 10,
      search,
      state,
    }),
    queryFn: async () => {
      try {
        console.log('activeOrganization', activeOrganization)
        const [clients, error] = await getClients({
          page,
          limit: 10,
          search,
          state,
        })

        if (error) {
          toast.error(error.message ?? 'Erro ao buscar clientes')
        }

        return clients
      } catch (error) {
        console.error(error)
      }
    },
    enabled: !!activeOrganization?.id,
  })

  const clients = response?.clients
  const total = response?.total

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {isLoading
              ? 'Carregando...'
              : `${clients?.length} cliente(s) encontrado(s)`}
          </CardTitle>
          {clients?.length && clients?.length > 0 && (
            <Badge variant="secondary">
              Página 1 de 1, total de {clients?.length ?? 0} registro(s)
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : clients?.length && clients?.length === 0 ? (
          <div className="py-12 text-center">
            <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Nenhum cliente encontrado
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Não foram encontrados clientes com os filtros aplicados.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                window.dispatchEvent(new CustomEvent(ModalEvent.ADD_CLIENT))
              }}
            >
              <Plus className="size-4" />
              Cadastrar primeiro cliente
            </Button>
          </div>
        ) : (
          <>
            {/* Mobile Cards - Visible only on small screens */}
            <div className="block space-y-4 sm:hidden">
              {clients?.map((client) => (
                <Card key={client.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {client.companyName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDocument(client.document)}
                        </p>
                      </div>
                      <Badge variant="outline">{client.state}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4" />
                        {client.city}, {client.state}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Phone className="h-4 w-4" />
                        {formatPhone(client.phone)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FileText className="h-4 w-4" />
                        IE: {client.state_registration}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Desktop Table - Hidden on small screens */}
            <div className="hidden overflow-x-auto sm:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>CNPJ/CPF</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Inscrição Estadual</TableHead>
                    <TableHead>Telefone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients?.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        {client.companyName}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {formatDocument(client.document)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{client.state}</Badge>
                      </TableCell>
                      <TableCell>{client.city}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {client.state_registration}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {formatPhone(client.phone)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
