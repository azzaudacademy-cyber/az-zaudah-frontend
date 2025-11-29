import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Keep this line
import { Menu } from "lucide-react"; // Remove BookHeart from here
import logo from "@/assets/logo.png"; // Import your logo image
import { supabase } from "@/lib/supabase"; // Import Supabase client
import { Session } from "@supabase/supabase-js";
import { ModeToggle } from "./mode-toggle";
import { useEffect } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Find a Teacher", href: "/find-teacher" },
  { name: "Contact", href: "/contact" },
];

const moreLinks = [
  { name: "Why Az-Zaudah", href: "/why-azzaudah", description: "Our mission and values." },
  { name: "About Us", href: "/about", description: "The story behind our academy." },
  { name: "Marketplace", href: "/marketplace", description: "Books and learning tools." },
  { name: "Parent Portal", href: "/parent-portal", description: "Access your child's progress." },
];

const coursesSubLinks = [
  { name: "Quran Recitation", href: "/courses/quran-recitation", description: "Master the art of reciting the Holy Quran." },
  { name: "Tajweed", href: "/courses/tajweed", description: "Learn the rules for proper Quranic pronunciation." },
  { name: "Hifdh & Qiraa'ah", href: "/courses/hifdh-qiraah", description: "Memorize the Quran and perfect your recitation styles." },
  { name: "Arabic", href: "/courses/arabic", description: "Understand the language of the Quran." },
  { name: "Islamic Studies", href: "/courses/islamic-studies", description: "Comprehensive knowledge of Islamic principles." },
];

export const Header = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${
      isActive ? "text-primary font-bold" : "text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <NavLink to="/" className="mr-6 flex items-center space-x-2">
          <img src={logo} alt="Az-Zaudah Academy" className="h-8 w-8 object-contain" />
          <span className="font-bold sm:inline-block">Az-Zaudah Academy</span>
        </NavLink>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.name}>
                <NavLink to={link.href} className={getNavLinkClass}>
                  {link.name}
                </NavLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {coursesSubLinks.map((link) => (
                    <ListItem key={link.name} to={link.href} title={link.name}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>More</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {moreLinks.map((link) => (
                    <ListItem key={link.name} to={link.href} title={link.name}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Action Buttons */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ModeToggle />
          <Button variant="outline" onClick={() => navigate('/donate')}>Donate</Button> {/* Always show Donate */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.user_metadata?.avatar_url} alt={session.user?.user_metadata?.full_name} />
                    <AvatarFallback>
                      {session.user?.user_metadata?.full_name?.charAt(0) || session.user?.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user.user_metadata.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/wallet')}>My Wallet</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={async () => {
                  await supabase.auth.signOut();
                  navigate('/');
                }}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate('/auth')}>Sign In</Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden ml-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="p-4">
                <div className="flex flex-col space-y-4"> {/* Mobile menu items */}
                  {[...navLinks, ...moreLinks].map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `text-lg font-medium ${isActive ? "text-primary" : "text-foreground"}`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                  {/* Add Courses sub-links directly to mobile menu for now */}
                  {coursesSubLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `ml-4 text-base font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const ListItem = ({
  to,
  title,
  children,
}: {
  to: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <NavLink
          to={to}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </NavLink>
      </NavigationMenuLink>
    </li>
  );
};

function useEffectLocal(arg0: () => () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
