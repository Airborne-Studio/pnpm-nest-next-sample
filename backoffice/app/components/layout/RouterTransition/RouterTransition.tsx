import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { useRouter } from 'next/router';
import { type FC, useEffect } from 'react';

export const RouterTransition: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => nprogress.start();
    const handleRouteChangeComplete = () => nprogress.complete();

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  return <NavigationProgress size={5} />;
};
