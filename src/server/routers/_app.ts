import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  healthz: procedure
  .query(async () => {
      return 'ok';
    }
  )
});

// export type definition of API
export type AppRouter = typeof appRouter;