import { Button, Stack } from '@chakra-ui/react';
import { trpc } from 'client/trpc';
import { GENESIS_BLOCK_ID } from 'common/block';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

import { BlockComponent } from './block';

dayjs.extend(relativeTime);

export interface ChainComponentProps {
  tipId: string;
}

export function ChainComponent({ tipId }: ChainComponentProps) {
  const { data: chain } = trpc.blocks.getChain.useQuery(tipId);

  if (!chain) return null;

  const oldestBlockId = chain[chain.length - 1];

  return (
    <Stack>
      {chain.map((blockId) => (
        <BlockComponent key={blockId} id={blockId} />
      ))}
      {oldestBlockId !== GENESIS_BLOCK_ID && (
        <LoadChainComponent tipId={oldestBlockId} />
      )}
    </Stack>
  );
}

export function LoadChainComponent(props: ChainComponentProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  return shouldLoad ? (
    <ChainComponent {...props} />
  ) : (
    <Button onClick={() => setShouldLoad(true)}>Load previous 10 blocks</Button>
  );
}
