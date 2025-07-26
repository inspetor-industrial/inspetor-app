'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@ipa/components/ui/card'
import { Input } from '@ipa/components/ui/input'
import { Label } from '@ipa/components/ui/label'
import { SelectItem } from '@ipa/components/ui/select'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@ipa/components/ui/select'
import { brazilianStates } from '@ipa/contants/brazil-states'
import { useDebouncedCallback } from '@mantine/hooks'
import { Search } from 'lucide-react'
import { useQueryState } from 'nuqs'

export function Filter() {
  const [searchTerm, setSearchTerm] = useQueryState('search', {
    defaultValue: '',
  })

  const [state, setState] = useQueryState('state', {
    defaultValue: 'all',
  })

  const setSearchTermDebounced = useDebouncedCallback(setSearchTerm, 500)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Search className="h-5 w-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Label htmlFor="search" className="mb-2 block text-sm font-medium">
              Buscar por empresa
            </Label>
            <Input
              id="search"
              type="text"
              placeholder="Pesquise pelo nome da empresa..."
              // value={searchTerm}
              onChange={(e) => setSearchTermDebounced(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-48">
            <Label htmlFor="state" className="mb-2 block text-sm font-medium">
              Estado
            </Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todos os estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os estados</SelectItem>
                {brazilianStates.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
