"use client"

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/components/authProvider";
import NavLinks, {NotUserLinks} from "./NavLinks";
import BrandLink from "@/components/layout/BrandLink";

export default function MobileNavbar({ className }) {
    const auth = useAuth();
    const handleSheetOpen = () => {
        console.log("SheetTrigger clicked");
    };

    return <Sheet>
        <SheetTrigger asChild>
            <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
                onClick={handleSheetOpen}
            >
                <Menu className="h-5 w-5"/>
                <span className="sr-only">Toggle navigation menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
                <BrandLink displayName={true} className="flex items-center gap-2 text-lg font-semibold"/>
                {NavLinks.map((navLinkItem, idx) => {
                    const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired;
                    return shouldHide ? null : (
                        <Link href={navLinkItem.href}
                              key={`nav-links-b-${idx}`}
                              className="text-muted-foreground hover:text-foreground">
                            {navLinkItem.label}
                        </Link>
                    );
                })}
                {auth.isAuthenticated ?
                    <Link href={"/logout"} className="text-muted-foreground hover:text-foreground">
                        Logout
                    </Link>
                    : <>
                        {NotUserLinks.map((navLinkItem, idx) => {
                            const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired;
                            return shouldHide ? null : (
                                <Link href={navLinkItem.href}
                                      key={`nav-links-c-${idx}`}
                                      className="text-muted-foreground hover:text-foreground">
                                    {navLinkItem.label}
                                </Link>
                            );
                        })}
                    </>
                }
            </nav>
        </SheetContent>
    </Sheet>
}
