import { Block } from 'common/block';
import { Id } from 'common/id';
import { BlockModel, blockToDoc, docToBlock } from 'server/models/block';

export async function createBlock(block: Block): Promise<Block> {
  const doc = await BlockModel.create(blockToDoc(block));
  return docToBlock(doc);
}

export async function getBlockById(id: Id): Promise<Block | null> {
  const doc = await BlockModel.findOne({ id });
  return doc ? docToBlock(doc) : null;
}

export async function getChildBlocks(id: Id): Promise<Block[]> {
  const docs = await BlockModel.find({ previd: id });
  return docs.map(docToBlock);
}

export async function getChain(id: Id, limit = 10): Promise<string[]> {
  const [res] = await BlockModel.aggregate<{
    chain: string[];
  }>([
    { $match: { id: id } },
    {
      $graphLookup: {
        from: 'blocks',
        startWith: '$previd',
        connectFromField: 'previd',
        connectToField: 'id',
        as: 'chain',
        maxDepth: limit,
        depthField: 'depth'
      }
    },
    { $unwind: '$chain' },
    { $sort: { 'chain.depth': 1 } },
    {
      $group: {
        _id: '$_id',
        chain: { $push: '$chain.id' }
      }
    },
    { $project: { chain: 1 } }
  ]);
  return res?.chain ?? [];
}
