import { ChainComponent } from 'client/components/explorer/chain';
import { ExplorerLayout } from 'client/components/layout';

export default function ExplorerPage() {
  return (
    <ExplorerLayout>
      <h1>EE374 Explorer</h1>
      <ChainComponent />
    </ExplorerLayout>
  );
}
