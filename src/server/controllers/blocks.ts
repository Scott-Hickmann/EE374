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

export async function getChainTip(): Promise<Block | null> {
  const [doc] = await BlockModel.find({})
    .sort({ height: -1, created: 1 })
    .limit(1);
  return doc ? docToBlock(doc) : null;
}

export async function getTree({
  minHeight,
  maxHeight
}: {
  minHeight?: number;
  maxHeight?: number;
}) {
  const docs = await BlockModel.find({
    height: { $gte: minHeight, $lt: maxHeight }
  }).sort({ height: 1 });
  const tree: Record<number, Block[]> = {};
  let isEmpty = true;
  for (const doc of docs) {
    const height = doc.height;
    if (!tree[height]) tree[height] = [];
    tree[height].push(docToBlock(doc));
    isEmpty = false;
  }
  return { tree, isEmpty };
}
