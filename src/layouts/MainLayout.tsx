import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { LayoutDashboard, CandlestickChart, BrainCircuit, ShieldCheck, PlusCircle, Settings, HelpCircle, Search } from 'lucide-react';

const navLinks = [
  { title: "Dashboard", path: "/overview", icon: LayoutDashboard },
  { title: "Tokens", path: "/token", icon: CandlestickChart },
  { title: "Insights", path: "/insights", icon: BrainCircuit },
  { title: "Portfolio", path: "/portfolio", icon: ShieldCheck },
];

export default function MainLayout() {
  const location = useLocation();
  const pageTitle = navLinks.find(link => location.pathname.startsWith(link.path))?.title || 'Dashboard';

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Static Sidebar */}
      <aside className="hidden h-screen w-72 flex-col border-r md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start text-left">
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-bold text-base">CAINAM Inc.</p>
                  <p className="text-xs text-muted-foreground">Production</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Staging</DropdownMenuItem>
              <DropdownMenuItem>Development</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <Button className="w-full justify-start"><PlusCircle className="mr-2 h-4 w-4" /> Quick Create</Button>
          <div className="space-y-1">
            <h4 className="px-3 text-xs font-semibold text-muted-foreground">ANALYTICS</h4>
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                  isActive ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="mt-auto p-4 space-y-2">
           <Separator />
           <Button variant="ghost" className="w-full justify-start text-muted-foreground"><Search className="mr-2 h-4 w-4" /> Search</Button>
           <Button variant="ghost" className="w-full justify-start text-muted-foreground"><HelpCircle className="mr-2 h-4 w-4" /> Get Help</Button>
           <Button variant="ghost" className="w-full justify-start text-muted-foreground"><Settings className="mr-2 h-4 w-4" /> Settings</Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
          <h1 className="text-xl font-semibold">{pageTitle}</h1>
           <Button
            variant="outline"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            GitHub
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto bg-muted/5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
