import { Breadcrumb } from '@ipa/components/breadcrumb'
import { SidebarTrigger } from '@ipa/components/ui/sidebar'

export async function Header() {
  return (
    <header className="flex h-16 border-b px-4 shadow shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 flex sm:hidden" />
        <Breadcrumb />
      </div>
      {/* <ThemeToggle /> */}
    </header>
  )
}
