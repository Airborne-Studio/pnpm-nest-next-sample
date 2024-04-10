import { AppShellSection } from '@mantine/core';
import type { FC } from 'react';
import { BiHomeAlt } from 'react-icons/bi';

import { DashboardNavSection } from '@/components/Dashboard/DashboardNavSection';

import classes from './Dashboard.module.css';

interface DashboardNavProps {
  close(): void;
}

const navSections: DashboardNavSection[] = [
  {
    links: [
      {
        label: 'Home',
        iconLeft: <BiHomeAlt size="1rem" />,
        pathname: '/',
      },
    ],
  },
];

export const DashboardNavigation: FC<DashboardNavProps> = ({ close }) => (
  <AppShellSection grow mt="md" className={classes.navSectionWrapper}>
    {navSections.map((section, sectionIndex) => (
      <DashboardNavSection
        key={sectionIndex}
        title={section.title}
        links={section.links}
        onNavLinkClick={close}
      />
    ))}
  </AppShellSection>
);
