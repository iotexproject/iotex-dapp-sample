import { createRouter } from 'server/createRouter';

export const templateRouter = createRouter().query('health', {
  async resolve({ ctx }) {
    return 'ok';
  }
});
