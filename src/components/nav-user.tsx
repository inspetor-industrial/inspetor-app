'use client'

import { useRouter } from '@bprogress/next'
import { Avatar, AvatarFallback, AvatarImage } from '@ipa/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ipa/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@ipa/components/ui/sidebar'
import { ModalEvent } from '@ipa/contants/modal-event'
import { authClient } from '@ipa/lib/auth.client'
import { getFirstLetters } from '@ipa/utils/get-first-letters'
import { Building, ChevronsUpDown, LogOut, User } from 'lucide-react'
import { toast } from 'sonner'

import { Skeleton } from './ui/skeleton'

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const { data: session, isPending: isLoadingSession } = authClient.useSession()
  const router = useRouter()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-inspetor-secondary data-[state=open]:text-muted"
            >
              {isLoadingSession ? (
                <Skeleton className="aspect-square size-8 rounded-lg bg-muted-foreground" />
              ) : (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session?.user?.image ?? ''}
                    alt={session?.user?.name ?? ''}
                  />
                  <AvatarFallback className="rounded-lg">
                    <span className="text-xs text-zinc-950 dark:text-zinc-50">
                      {session?.user?.name
                        ? getFirstLetters(session?.user?.name)
                        : 'UU'}
                    </span>
                  </AvatarFallback>
                </Avatar>
              )}
              {isLoadingSession ? (
                <div className="grid flex-1 text-left text-sm leading-tight gap-1">
                  <Skeleton className="h-3 w-24 rounded-lg bg-muted-foreground" />
                  <Skeleton className="h-3 w-24 rounded-lg bg-muted-foreground" />
                </div>
              ) : (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session?.user?.name ?? ''}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user?.email ?? ''}
                  </span>
                </div>
              )}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={isMobile ? 4 : 10}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session?.user?.image ?? ''}
                    alt={session?.user?.name ?? ''}
                  />
                  <AvatarFallback className="rounded-lg">
                    {session?.user?.name
                      ? getFirstLetters(session?.user?.name)
                      : 'UU'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session?.user?.name ?? ''}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user?.email ?? ''}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  const event = new CustomEvent(ModalEvent.MY_ORGANIZATIONS)
                  window.dispatchEvent(event)
                }}
                className="cursor-pointer"
              >
                <Building />
                Minhas Empresas
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push('/profile')
                }}
                className="cursor-pointer"
              >
                <User />
                Perfil
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await authClient.signOut(
                  {},
                  {
                    onError: (error) => {
                      toast.error(error.error.message)
                    },
                    onSuccess: () => {
                      toast.success('Saiu com sucesso')

                      router.push('/auth/sign-in')
                    },
                  },
                )
              }}
              className="cursor-pointer"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
