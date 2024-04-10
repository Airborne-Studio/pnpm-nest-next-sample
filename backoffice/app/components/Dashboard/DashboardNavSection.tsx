import { Box, Text } from '@mantine/core';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import { DashboardNavLink } from '@/components/Dashboard/DashboardNavLink';

import classes from './Dashboard.module.css';

export interface DashboardNavSection {
  title?: ReactNode;
  links: DashboardNavLink[];
  onNavLinkClick?: () => void;
}

type DashboardNavSectionProps = DashboardNavSection;

export const DashboardNavSection: FC<
  PropsWithChildren<DashboardNavSectionProps>
> = ({ title, links, onNavLinkClick, children }) => (
  <Box px="sm" className={classes.navSection}>
    {title && <Text className={classes.navSectionTitle}>{title}</Text>}
    {links.map((link) => (
      <DashboardNavLink
        key={`${link.pathname}${link.label}`}
        link={link}
        onClick={onNavLinkClick}
      />
    ))}
    {children}
  </Box>
);
