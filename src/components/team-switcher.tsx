import { InspetorLogo } from '@ipa/assets/logo'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@ipa/components/ui/sidebar'

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-accent-foreground"
        >
          <div className="bg-sidebar-primary text-muted-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <InspetorLogo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm text-muted leading-tight">
            <span className="truncate font-medium">Inspetor Industrial</span>
            <span className="truncate text-xs">Enterprise</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
