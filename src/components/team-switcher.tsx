'use client'

import { useRouter } from '@bprogress/next'
import { InspetorLogo } from '@ipa/assets/logo'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@ipa/components/ui/sidebar'
import { ModalEvent } from '@ipa/contants/modal-event'
import { authClient } from '@ipa/lib/auth.client'
import { getFirstLetters } from '@ipa/utils/get-first-letters'
import { ChevronsUpDown, Plus } from 'lucide-react'
import { useEffect } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function TeamSwitcher() {
  const { data: organizations, isPending: isLoadingOrganizations } =
    authClient.useListOrganizations()
  const {
    data: activeOrganization,
    isRefetching: isLoadingActiveOrganization,
  } = authClient.useActiveOrganization()

  const router = useRouter()

  function handleOpenCreateOrganizationModal() {
    const event = new CustomEvent(ModalEvent.CREATE_ORGANIZATION)

    window.dispatchEvent(event)
  }

  useEffect(() => {
    if (!activeOrganization && organizations && organizations.length > 0) {
      authClient.organization.setActive({
        organizationId: organizations?.[0].id,
      })

      return
    }
  }, [activeOrganization, organizations])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full cursor-pointer" asChild>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer data-[state=open]:bg-inspetor-secondary data-[state=open]:[&>svg]:text-muted data-[state=open]:text-accent-foreground"
            >
              {isLoadingOrganizations || isLoadingActiveOrganization ? (
                <Skeleton className="aspect-square size-8 rounded-lg bg-muted-foreground" />
              ) : (
                <div className="bg-sidebar-primary text-muted-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <InspetorLogo className="size-4" />
                </div>
              )}
              <div className="grid flex-1 text-left text-sm text-muted leading-tight">
                {isLoadingOrganizations || isLoadingActiveOrganization ? (
                  <>
                    <Skeleton className="h-3 w-24 mb-1 rounded bg-muted-foreground" />
                    <Skeleton className="h-3 w-16 rounded bg-muted-foreground" />
                  </>
                ) : (
                  <>
                    <span className="truncate font-medium">
                      {activeOrganization?.name}
                    </span>
                    <span className="truncate text-xs">
                      {activeOrganization?.slug}
                    </span>
                  </>
                )}
              </div>

              <ChevronsUpDown className="size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64"
            align="start"
            side="right"
            sideOffset={10}
          >
            {isLoadingOrganizations ? (
              <DropdownMenuItem>
                <Skeleton className="h-10 w-full" />
              </DropdownMenuItem>
            ) : (
              organizations?.map((organization) => (
                <DropdownMenuItem
                  key={organization.id}
                  className="cursor-pointer"
                  onClick={() => {
                    authClient.organization.setActive({
                      organizationId: organization.id,
                    })
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 flex aspect-square size-8 items-center justify-center rounded-lg">
                      {getFirstLetters(organization.name)}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {organization.name}
                      </span>
                      <span className="truncate text-xs">
                        {organization.slug}
                      </span>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))
            )}

            <DropdownMenuSeparator className="" />

            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2 justify-center"
              onClick={handleOpenCreateOrganizationModal}
            >
              <Plus className="size-4" />
              <span>Adicionar Empresa</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
