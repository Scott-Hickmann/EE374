import { Text } from '@chakra-ui/react';
import { ExplorerLayout } from 'client/components/layout';
import { trpc } from 'client/trpc';
import dynamic from 'next/dynamic';

const ChainComponent = dynamic(
  () => import('client/components/explorer/chain'),
  {
    ssr: false
  }
);

export default function ExplorerPage() {
  const { data: tip } = trpc.blocks.getChainTip.useQuery();

  return (
    <ExplorerLayout>
      <Text>Down for maintenance</Text>
      {/* {tip ? <ChainComponent tipHeight={tip.height} /> : null} */}
    </ExplorerLayout>
  );
}
