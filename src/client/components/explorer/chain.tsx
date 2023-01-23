import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Divider, Stack, Text, VStack } from '@chakra-ui/react';
import { trpc } from 'client/trpc';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { BlockComponent } from './block';

dayjs.extend(relativeTime);

// export interface ChainComponentProps {
//   tipId: string;
// }

// export function ChainComponent({ tipId }: ChainComponentProps) {
//   const { data: chain } = trpc.blocks.getChain.useQuery(tipId);

//   if (!chain) return null;

//   const oldestBlockId = chain[chain.length - 1];

//   return (
//     <Stack>
//       {chain.map((blockId) => (
//         <BlockComponent key={blockId} id={blockId} />
//       ))}
//       {oldestBlockId !== GENESIS_BLOCK_ID && (
//         <LoadChainComponent tipId={oldestBlockId} />
//       )}
//     </Stack>
//   );
// }

// export function LoadChainComponent(props: ChainComponentProps) {
//   const [shouldLoad, setShouldLoad] = useState(false);

//   return shouldLoad ? (
//     <ChainComponent {...props} />
//   ) : (
//     <Button onClick={() => setShouldLoad(true)}>Load previous 10 blocks</Button>
//   );
// }

function useTriggerScrollFix(deps: unknown[]) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scroll'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

type BlockContainerProps = React.PropsWithChildren<{
  isLast: boolean;
}>;

function BlockContainer({ isLast, children }: BlockContainerProps) {
  const borderColor = useColorModeValue('black', 'white');

  return (
    <VStack width="full" spacing={0}>
      <Box
        width="full"
        borderWidth={2}
        borderColor={borderColor}
        borderRadius="md"
        p={2}
      >
        {children}
      </Box>
      {!isLast && (
        <Divider
          orientation="vertical"
          borderWidth={1}
          borderColor={borderColor}
          height={4}
          opacity={1}
        />
      )}
    </VStack>
  );
}

interface ChainListProps {
  blockIds: string[];
  fetchMoreData: () => void;
  hasMore: boolean;
}

function ChainList({ blockIds, fetchMoreData, hasMore }: ChainListProps) {
  useTriggerScrollFix([blockIds.length]);

  return (
    <Stack width="full">
      <InfiniteScroll
        dataLength={blockIds.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {blockIds.map((id, index) => (
          <BlockContainer key={id} isLast={index === blockIds.length - 1}>
            <BlockComponent id={id} hideLinks />
          </BlockContainer>
        ))}
      </InfiniteScroll>
    </Stack>
  );
}

export function ChainComponent() {
  const { data, fetchNextPage, hasNextPage } =
    trpc.blocks.getChain.useInfiniteQuery(
      {
        limit: 10
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor
      }
    );

  useTriggerScrollFix([data]);

  if (!data) return null;

  const blockIds = data.pages.map((page) => page.blockIds).flat();

  return (
    <VStack width="full" p={4}>
      <VStack width="full" maxW="1424px">
        <Text>Chain Tip</Text>
        <ChainList
          blockIds={blockIds}
          fetchMoreData={fetchNextPage}
          hasMore={hasNextPage ?? false}
        />
      </VStack>
    </VStack>
  );
}
