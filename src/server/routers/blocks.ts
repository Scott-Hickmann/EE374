import { Block } from 'common/block';
import { Id } from 'common/id';
import {
  createBlock,
  getBlockById,
  getChainTip,
  getChildBlocks,
  getTree
} from 'server/controllers/blocks';
import {
  adminDatabaseProcedure,
  databaseProcedure
} from 'server/procedures/database';
import { z } from 'zod';

import { router } from '../trpc';

export const blocksRouter = router({
  create: adminDatabaseProcedure.input(Block).mutation(({ input }) => {
    return createBlock(input);
  }),
  getById: databaseProcedure.input(Id).query(({ input }) => {
    return getBlockById(input);
  }),
  getChildren: databaseProcedure.input(Id).query(({ input }) => {
    return getChildBlocks(input);
  }),
  getTree: databaseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish() // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async ({ input: { limit, cursor } }) => {
      if (cursor == null) {
        const chainTip = await getChainTip();
        cursor = chainTip ? chainTip.height + 1 : 0;
      }
      const { tree, isEmpty } = await getTree({
        minHeight: cursor - limit,
        maxHeight: cursor
      });
      let nextCursor: number | undefined = undefined;
      if (!isEmpty) {
        nextCursor = cursor - limit;
      }
      return { tree, nextCursor };
    })
});
