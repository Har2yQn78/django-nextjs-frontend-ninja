"use client"

import { useState } from "react";
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/components/authProvider";
import NavLinks, {NotUserLinks} from "./NavLinks";
import BrandLink from "@/components/layout/BrandLink";
import MobileNavbar from "@/components/layout/MobileNavbar";

export default function Navbar({ className }) {
  const auth = useAuth();
  const finalClass = className ? className : "sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6";

  const handleSheetOpen = () => {
    console.log("SheetTrigger clicked");
  };

  return (
    <header className={finalClass}>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <BrandLink displayName={true} />
        {NavLinks.map((navLinkItem, idx) => {
          const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired;
          return shouldHide ? null : (
            <Link href={navLinkItem.href}
                  key={`nav-links-a-${idx}`}
                  className="text-muted-foreground transition-colors hover:text-foreground">
              {navLinkItem.label}
            </Link>
          );
        })}
      </nav>
        <MobileNavbar />
        <div className="md:hidden">
            <BrandLink displayName={true} />
        </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {auth.isAuthenticated ?
             <div className="ml-auto">
            <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5"/>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={auth.logout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
            </DropdownMenu>
            </div>
            :<div className="ml-auto space-x-2">
                    {NotUserLinks.map((navLinkItem, idx) => {
                  const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired;
                  return shouldHide ? null : (
                    <Link href={navLinkItem.href}
                           key={`nav-links-d-${idx}`}
                          className="text-muted-foreground transition-colors hover:text-foreground">
                      {navLinkItem.label}
                    </Link>
              );
            })}
            </div>
          }
      </div>
    </header>
  );
}
