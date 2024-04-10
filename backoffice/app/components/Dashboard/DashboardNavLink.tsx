import { NavLink } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';
import type React from 'react';

import classes from './Dashboard.module.css';

interface DashboardLinkAction {
  children: ReactNode;
  title: string | ReactNode;
  size: string;
}
export interface DashboardNavLink {
  label: string;
  pathname: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  nestedLinks?: Omit<DashboardNavLink, 'nestedLinks'>[];
  disablePrefetch?: boolean;
  activePathMatchers?: RegExp[];
  action?: DashboardLinkAction;
}

interface DashboardNavLinkProps {
  link: DashboardNavLink;
  onClick?: () => void;
}

const matchActivePath = (pathname: string, link: DashboardNavLink) =>
  link.pathname === pathname ||
  Boolean(
    link.activePathMatchers?.some((activePathMatcher) =>
      activePathMatcher.test(pathname)
    )
  );

export const DashboardNavLink: FC<DashboardNavLinkProps> = ({
  link,
  onClick,
}) => {
  const { asPath, query } = useRouter();

  const hasNestedLinks = link.nestedLinks && link.nestedLinks.length > 0;
  const active = matchActivePath(asPath, link);
  const childActive = !active && asPath.startsWith(link.pathname);
  const idActive = Boolean(
    !active && query.id && asPath.startsWith(`${link.pathname}/${query.id}`)
  );

  const handleClick = () => {
    if (hasNestedLinks) {
      return;
    }
    onClick?.();
  };

  return (
    <NavLink
      label={link.label}
      active={active || idActive}
      defaultOpened={childActive}
      leftSection={link.iconLeft}
      component={Link}
      href={link.pathname}
      onClick={handleClick}
      prefetch={false}
      variant="filled"
      classNames={{
        root: classes.navLink,
        children: classes.navLinkChildren,
      }}
    >
      {link.nestedLinks?.map((nestedLink) => (
        <DashboardNavLink
          key={`${link.pathname}${nestedLink.pathname}${nestedLink.label}`}
          link={nestedLink}
          onClick={onClick}
        />
      ))}
    </NavLink>
  );
};
