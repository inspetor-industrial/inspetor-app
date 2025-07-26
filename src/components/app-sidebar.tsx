'use client'

import { NavHelp } from '@ipa/components/nav-help'
import { NavMain } from '@ipa/components/nav-main'
import { NavUser } from '@ipa/components/nav-user'
import { TeamSwitcher } from '@ipa/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@ipa/components/ui/sidebar'
import {
  Database,
  FileText,
  Frame,
  HardDrive,
  HelpCircle,
  Map,
  PieChart,
  Settings2,
} from 'lucide-react'
import * as React from 'react'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Base de dados',
      url: '#',
      icon: Database,
      isActive: true,
      items: [
        {
          title: 'Clientes',
          url: '/clients',
        },
        {
          title: 'Agendamentos',
          url: '#',
        },
      ],
    },
    {
      title: 'Relatórios',
      url: '#',
      icon: FileText,
      items: [
        {
          title: 'Inspeção de Caldeiras',
          url: '#',
        },
        {
          title: 'Calibração de Manômetros',
          url: '#',
        },
        {
          title: 'Calibração de Válvulas de Segurança',
          url: '#',
        },
      ],
    },
    {
      title: 'Armazenamento',
      url: '#',
      icon: HardDrive,
      items: [
        {
          title: 'Relatórios',
          url: '#',
        },
        {
          title: 'Imagens',
          url: '#',
        },
      ],
    },
  ],
  help: [
    {
      name: 'Ajuda',
      url: '#',
      icon: HelpCircle,
    },
  ],
}

type AppSidebarProps = {
  hasPermissionToAddOrganization?: boolean
}

export function AppSidebar({
  hasPermissionToAddOrganization = false,
  ...props
}: React.ComponentProps<typeof Sidebar> & AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          hasPermissionToAddOrganization={hasPermissionToAddOrganization}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavHelp help={data.help} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
