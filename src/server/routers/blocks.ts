import { Block } from 'common/block';
import { Id } from 'common/id';
import {
  createBlock,
  getBlockById,
  getChain,
  getChildBlocks
} from 'server/controllers/blocks';
import {
  adminDatabaseProcedure,
  databaseProcedure
} from 'server/procedures/database';

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
  getChain: databaseProcedure.input(Id).query(({ input }) => {
    return getChain(input);
  })
});
