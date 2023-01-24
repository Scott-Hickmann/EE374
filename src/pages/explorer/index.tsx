import { ExplorerLayout } from 'client/components/layout';
import dynamic from 'next/dynamic';

const ChainComponent = dynamic(
  () => import('client/components/explorer/chain'),
  {
    ssr: false
  }
);

export default function ExplorerPage() {
  return (
    <ExplorerLayout>
      <ChainComponent />
    </ExplorerLayout>
  );
}
