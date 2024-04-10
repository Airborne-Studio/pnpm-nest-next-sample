import {
  Breadcrumbs as MantineBreadcrumbs,
  Center,
  Group,
  Portal,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { BiChevronRight } from 'react-icons/bi';

interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
  inactiveItem?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => (
  <Portal target="#breadcrumbs">
    <MantineBreadcrumbs
      separator={<BiChevronRight size="1rem" color="black" />}
      fw="bold"
      display={{ base: 'none', md: 'flex' }}
    >
      {items.map((breadcrumb, index) => (
        <Center key={String(breadcrumb.href) + index} fs="md">
          {breadcrumb.href ? (
            <Link href={breadcrumb.href}>
              <Group gap="sm" fw="normal" c="navy.6">
                <Text fz="md">{breadcrumb.label}</Text>
              </Group>
            </Link>
          ) : (
            <Text
              key={index}
              fz="md"
              c="navy.6"
              fw={breadcrumb.inactiveItem ? 'lighter' : 'bold'}
            >
              {breadcrumb.label}
            </Text>
          )}
        </Center>
      ))}
    </MantineBreadcrumbs>
  </Portal>
);
