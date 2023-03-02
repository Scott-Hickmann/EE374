import { forwardRef } from '@chakra-ui/react';
import { PixiComponent, useApp } from '@pixi/react-pixi';
import { Application } from 'pixi.js';
import { Viewport as PixiViewport } from 'pixi-viewport';

export interface ViewportProps {
  screenWidth: number;
  screenHeight: number;
  worldWidth: number;
  worldHeight: number;
}

interface OriginalViewportProps extends ViewportProps {
  app: Application;
  screenWidth: number;
  screenHeight: number;
  worldWidth: number;
  worldHeight: number;
}

type PixiViewportProps = React.PropsWithChildren<
  OriginalViewportProps & {
    plugins?: (keyof PixiViewport)[];
  }
>;

const ViewportComponent = PixiComponent<PixiViewportProps, PixiViewport>(
  'Viewport',
  {
    create(props) {
      const { app, ...viewportProps } = props;

      const viewport = new PixiViewport({
        interaction: app.renderer.plugins.interaction,
        ...viewportProps
      });

      // activate plugins
      (props.plugins || []).forEach((plugin) => {
        (viewport[plugin] as () => void)();
      });

      viewport.clampZoom({
        minWidth: 500,
        minHeight: 500,
        maxWidth: 4000,
        maxHeight: 4000
      });

      return viewport;
    },
    applyProps(viewport, _oldProps, _newProps) {
      const {
        plugins: oldPlugins,
        children: oldChildren,
        ...oldProps
      } = _oldProps;
      oldPlugins;
      oldChildren;
      const {
        plugins: newPlugins,
        children: newChildren,
        ...newProps
      } = _newProps;
      newPlugins;
      newChildren;

      Object.keys(newProps).forEach((prop) => {
        const p = prop as keyof OriginalViewportProps;
        if (oldProps[p] !== newProps[p] && p !== 'app') {
          viewport[p] = newProps[p];
        }
      });
    }
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Viewport = forwardRef<ViewportProps, any>(function Viewport(
  props,
  ref
) {
  return <ViewportComponent ref={ref} app={useApp()} {...props} />;
});
