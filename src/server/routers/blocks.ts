import { Block } from 'common/block';
import { Id } from 'common/id';
import {
  createBlock,
  getBlockById,
  getChain,
  getChildBlocks,
  getTree
} from 'server/controllers/blocks';
import { BlockModel } from 'server/models/block';
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
  getChain: databaseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: Id.nullish() // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async ({ input }) => {
      let cursor: string;
      const blockIds: string[] = [];
      if (input.cursor) {
        cursor = input.cursor;
      } else {
        // TODO: Get longest chain tip
        const [block] = await BlockModel.find({})
          .sort({ created: -1 })
          .limit(1);
        blockIds.push(block.id);
        cursor = block.id;
      }
      blockIds.push(...(await getChain(cursor, input.limit ?? undefined)));
      let nextCursor: typeof cursor | undefined = undefined;
      if (blockIds.length > 0) {
        nextCursor = blockIds[blockIds.length - 1];
      }
      return { blockIds, nextCursor };
    }),
  getTree: databaseProcedure.query(async () => {
    return getTree();
  })
});
