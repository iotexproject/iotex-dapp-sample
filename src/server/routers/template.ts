
import { z } from 'zod';
import { procedure, router } from '../trpc';
export const templateRouter = router({
  whoami: procedure.
  input(z.object({
    name: z.string()
  })).
  output(z.object({
    name: z.string()
  }))
  .query(async ({input}) => {
    const {name} = input
    return name
    }
  )
});