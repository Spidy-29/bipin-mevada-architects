import Link from "next/link";
import { forwardRef } from "react";
import type { AnchorHTMLAttributes } from "react";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, to, ...props }, ref) => {
    const router = useRouter();
    return <Link ref={ref} href={to} className={cn(className, router.asPath === to && activeClassName)} {...props} />;
  },
);

NavLink.displayName = "NavLink";
export { NavLink };
