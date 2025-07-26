import { AddClientButton } from './components/add-client-button'
import { Filter } from './components/filter'
import { ClientsTable } from './components/table'

export default function ClientsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Lista de Clientes
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Gerencie seus clientes cadastrados
          </p>
        </div>
        <AddClientButton />
      </div>

      {/* Filters Card */}
      <Filter />

      {/* Results */}
      <ClientsTable />
    </div>
  )
}
