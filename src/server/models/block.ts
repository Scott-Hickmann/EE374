import { Block, TARGET } from 'common/block';
import {
  HydratedDocument,
  Model,
  model,
  models,
  ObjectId,
  Schema
} from 'mongoose';

import { defaultSchemaOptions } from './common';

export type BlockModelType = Block;

const schema = new Schema<BlockModelType>(
  {
    id: { type: String, required: true, unique: true, index: true },
    type: { type: String, required: true, enum: ['block'] },
    created: { type: Number, required: true, min: 0 },
    T: { type: String, required: true, enum: [TARGET] },
    nonce: { type: String, required: true },
    previd: { type: String, required: false },
    miner: { type: String, required: false },
    note: { type: String, required: false },
    studentids: { type: [String], required: false },
    txids: { type: [String], required: true }
  },
  defaultSchemaOptions
);

// eslint-disable-next-line @typescript-eslint/ban-types
export const BlockModel: Model<BlockModelType, {}, {}> =
  models.Block ?? model<BlockModelType>('Block', schema);

export function blockToDoc(block: Block): BlockModelType {
  return block;
}

export function docToBlock(block: HydratedDocument<BlockModelType>): Block {
  return block.toObject();
}

export function aggregationToBlock(
  block: Block & { _id: ObjectId; __v: string }
): Block {
  const keys = Object.keys(Block.shape);
  return Object.fromEntries(
    Object.entries(block).filter(([key]) => keys.includes(key))
  ) as Block;
}
