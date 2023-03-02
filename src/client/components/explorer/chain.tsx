import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { Stage } from '@pixi/react-pixi';
import { trpc } from 'client/trpc';
import { Id } from 'common/id';
import { Viewport as PixiViewport } from 'pixi-viewport';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { BlockComponent } from './block';
import { getBounds, PixiTree } from './pixi/tree';
import { Viewport } from './viewport';

const START_Y = 100;
const LIMIT = 10;
const SCROLL_BUFFER = 100;

export function ChainComponent() {
  const { data, fetchNextPage } = trpc.blocks.getTree.useInfiniteQuery(
    {
      limit: LIMIT
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false
    }
  );

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const viewportRef = useRef<PixiViewport>(null);

  const width = windowWidth;
  const height = windowHeight - 66;
  const stageOptions = {
    antialias: true,
    autoDensity: true,
    backgroundAlpha: 0
  } as const;

  const [blockId, setBlockId] = useState<Id>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const color = useColorModeValue('#000000', '#ffffff');

  const onWheelEvent = (event: Event) => {
    event.preventDefault();
  };

  const tree = useMemo(
    () =>
      data
        ? data.pages
            .map((page) => page.tree)
            .reduce(function (result, current) {
              return Object.assign(result, current);
            }, {})
        : {},
    [data]
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onDrag = () => {
      const { bottomY } = getBounds(START_Y, tree);
      const { y, height } = viewport.getVisibleBounds();
      // if (y < topY) {
      //   console.log('top');
      // }
      if (y + height > bottomY - SCROLL_BUFFER) {
        fetchNextPage();
        viewport.off('moved', onDrag);
      }
    };
    viewport.on('moved', onDrag);
    return () => {
      viewport.off('moved', onDrag);
    };
  }, [viewportRef, tree, fetchNextPage]);

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
          ref={viewportRef}
          plugins={['drag', 'pinch', 'wheel']}
          screenWidth={width}
          screenHeight={height}
          worldWidth={1000}
          worldHeight={1000}
        >
          <PixiTree
            tree={tree}
            x={windowWidth / 2}
            y={START_Y}
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
