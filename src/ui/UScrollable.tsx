import './UScrollable.css';
import React, {
  ReactElement,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {UThemeContext} from './UTheme';

type Props = {
  children: ReactNode;
};

export default function UScrollable({children}: Props): ReactElement {
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  useLayoutEffect(() => {
    setContainerHeight(containerRef.current.offsetHeight);
  }, [children]);

  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  useLayoutEffect(() => {
    setContentHeight(contentRef.current.offsetHeight);
  }, [children]);

  const [top, setTop] = useState(0);

  const showScroll = contentHeight > containerHeight;
  const {backgroundEmphasisColor} = useContext(UThemeContext);

  return (
    <div className="UScrollable-container">
      <div
        className="UScrollable-content-container"
        ref={containerRef}
        onWheel={handleWheel}
      >
        <div className="UScrollable-content" ref={contentRef} style={{top}}>
          {children}
        </div>
      </div>
      <div
        className="UScrollable-scroll-area"
        style={{backgroundColor: backgroundEmphasisColor}}
      >
        {showScroll && (
          <ScrollHandle
            {...{containerHeight, contentHeight, contentTop: top}}
          />
        )}
      </div>
    </div>
  );

  function handleWheel(e: {deltaY: number}) {
    const topMax = 0;
    const topMin =
      contentHeight < containerHeight ? 0 : containerHeight - contentHeight;
    const newTop = Math.max(Math.min(top - e.deltaY, topMax), topMin);
    setTop(newTop);
  }
}

type ScrollHandleProps = {
  containerHeight: number;
  contentHeight: number; // we show, only if this is >= container height
  contentTop: number;
};

function ScrollHandle({
  contentHeight,
  containerHeight,
  contentTop,
}: ScrollHandleProps): ReactElement {
  const {scrollHandleColor: backgroundColor} = useContext(UThemeContext);
  const height = containerHeight * (containerHeight / contentHeight);
  const scrollRange = containerHeight - height;
  const top = scrollRange * (-contentTop / (contentHeight - containerHeight));
  return (
    <div
      className="UScrollable-scroll-handle"
      style={{height, top, backgroundColor}}
    ></div>
  );
}
