import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Box,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { Stage } from '@pixi/react-pixi';
import { trpc } from 'client/trpc';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useWindowSize } from 'usehooks-ts';

import { BlockComponent } from './block';
import { PixiTree } from './pixi/tree';
import { Viewport } from './viewport';

dayjs.extend(relativeTime);

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

export function ChainListComponent() {
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

export function ChainComponent() {
  const { data: tree } = trpc.blocks.getTree.useQuery();

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const width = windowWidth;
  const height = windowHeight - 66;
  const stageOptions = {
    antialias: true,
    autoDensity: true,
    backgroundAlpha: 0
  } as const;

  const [blockId, setBlockId] = useState<string>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const color = useColorModeValue('#000000', '#ffffff');

  const onWheelEvent = (event: Event) => {
    event.preventDefault();
  };

  if (!tree) return null;

  return (
    <>
      <Stage
        width={width}
        height={height}
        options={stageOptions}
        onMount={(app) => {
          const canvas = app.view;
          canvas.addEventListener('wheel', onWheelEvent, false);
          canvas.addEventListener('mousewheel', onWheelEvent, false);
          canvas.addEventListener('DOMMouseScroll', onWheelEvent, false);
        }}
        onUnmount={(app) => {
          const canvas = app.view;
          canvas.addEventListener('wheel', onWheelEvent, false);
          canvas.addEventListener('mousewheel', onWheelEvent, false);
          canvas.addEventListener('DOMMouseScroll', onWheelEvent, false);
        }}
      >
        <Viewport
          plugins={['drag', 'pinch', 'wheel']}
          screenWidth={width}
          screenHeight={height}
          worldWidth={1000}
          worldHeight={1000}
        >
          <PixiTree
            tree={tree}
            x={windowWidth / 2}
            y={100}
            color={color}
            onClick={(blockId) => {
              setBlockId(blockId);
              onOpen();
            }}
          />
        </Viewport>
      </Stage>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
        <ModalOverlay />
        {blockId && (
          <ModalContent>
            <ModalHeader>Block Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <BlockComponent id={blockId} />
            </ModalBody>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}

export default ChainComponent;
