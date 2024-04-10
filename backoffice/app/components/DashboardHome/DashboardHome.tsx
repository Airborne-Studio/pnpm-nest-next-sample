import { Container, Group, ScrollArea, Stack, Text } from '@mantine/core';
import type { FC } from 'react';

import classes from './DashboardHome.module.css';

export const DashboardHome: FC = () => (
  <ScrollArea className={classes.home}>
    <Container size="lg">
      <Stack py="md" gap="md">
        <Group bg="white" pl="xxl" gap="lg" justify="space-between">
          <Stack gap="sm" py="md">
            <Text>Welcome to Back Office</Text>
          </Stack>
        </Group>
      </Stack>
    </Container>
  </ScrollArea>
);
