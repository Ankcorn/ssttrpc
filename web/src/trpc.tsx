import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../../services/functions/trpc';

export const trpc = createReactQueryHooks<AppRouter>();