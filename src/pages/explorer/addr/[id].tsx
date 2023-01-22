import { AddressComponent } from 'client/components/explorer/address';
import { ExplorerLayout } from 'client/components/layout';
import { useRouter } from 'next/router';

export default function AddressPage() {
  const router = useRouter();

  return (
    <ExplorerLayout>
      <h1>EE374 Explorer TX</h1>
      {router.query.id !== undefined && (
        <AddressComponent id={String(router.query.id)} />
      )}
    </ExplorerLayout>
  );
}
