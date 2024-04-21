import { Grid, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CSSProperties } from "react";

const UpSegment = styled("div")({
  clipPath: "polygon(0% 100%, 50% 14.4%, 100% 100%)",
  position: "fixed",
});

const DownSegment = styled("div")({
  clipPath: "polygon(0% 14.4%, 50% 100%, 100% 14.4%)",
  position: "fixed",
});

interface HexSegment {
  left: number;
  top: number;
  styles?: React.CSSProperties;
}

interface HexSelectSegment {
  styles?: React.CSSProperties;
  element: React.ReactNode;
}
export interface HexSelectSegments {
  topLeft: HexSelectSegment;
  topCenter: HexSelectSegment;
  topRight: HexSelectSegment;
  bottomLeft: HexSelectSegment;
  bottomCenter: HexSelectSegment;
  bottomRight: HexSelectSegment;
}
type HexSegmentsState = Record<keyof HexSelectSegments, HexSegment>;

const getSideLength = () =>
  Math.min(
    window.innerHeight / Math.sin(Math.PI / 3) / 2,
    window.innerWidth / 2,
  );

const getHalfHeight = (sideLength: number) =>
  sideLength * Math.sin(Math.PI / 3);

const getSegments = (
  container: HTMLDivElement,
  sideLength: number,
  halfHeight: number,
  children: HexSelectSegments,
) => {
  const containerLeft = container.offsetLeft;
  let containerTop = container.offsetTop;
  // see styles above - this offsets the slightly squat, non-square triangle required to be equilateral
  containerTop -= 0.156 * halfHeight;

  const bottomTop = halfHeight - 4;
  const segments: HexSegmentsState = {
    bottomLeft: {
      left: 0,
      top: bottomTop,
      styles: children.bottomLeft.styles,
    },
    bottomCenter: {
      left: 0.5 * sideLength,
      top: bottomTop,
      styles: children.bottomCenter.styles,
    },
    bottomRight: {
      left: sideLength,
      top: bottomTop,
      styles: children.bottomRight.styles,
    },
    topLeft: {
      left: 0,
      top: 0,
      styles: children.topLeft.styles,
    },
    topCenter: {
      left: 0.5 * sideLength,
      top: 0,
      styles: children.topCenter.styles,
    },
    topRight: {
      left: sideLength,
      top: 0,
      styles: children.topRight.styles,
    },
  };

  for (const segment of Object.values(segments)) {
    segment.left += containerLeft;
    segment.top += containerTop ?? 0;
  }
  return segments;
};

const renderSegments = (
  segments: HexSegmentsState,
  children: HexSelectSegments,
  sideLength: number,
) =>
  Object.entries(segments).map(([key, { left, top, styles }], index) => {
    const isUp = index % 2 === 1;
    const Segment = isUp ? UpSegment : DownSegment;
    const child = children[key as keyof HexSelectSegments];
    const sizeStyles: CSSProperties = {
      minWidth: `${sideLength}px`,
      minHeight: `${sideLength}px`,
    };
    const positionStyles: CSSProperties = {
      position: "fixed",
      left: `${left}px`,
      top: `${top}px`,
    };
    console.log(key, styles);
    return (
      <Segment
        key={key}
        style={{
          ...sizeStyles,
          ...positionStyles,
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          sx={{ ...sizeStyles, ...(styles ?? {}) }}
        >
          {child.element}
        </Grid>
      </Segment>
    );
  });

export interface HexSelectProps {
  children: HexSelectSegments;
}

export const HexSelect: React.FC<HexSelectProps> = ({ children }) => {
  const [sideLength, setSideLength] = useState(getSideLength());
  const [halfHeight, setHalfHeight] = useState(getHalfHeight(sideLength));

  const [segments, setSegments] = useState<HexSegmentsState>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const sideLength = getSideLength();
      setHalfHeight(() => {
        setSideLength(sideLength);
        return getHalfHeight(sideLength);
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    setSegments(
      getSegments(containerRef.current, sideLength, halfHeight, children),
    );
  }, [sideLength, halfHeight, children]);

  return (
    <div
      ref={containerRef}
      style={{ minHeight: halfHeight * 2, minWidth: sideLength * 2 }}
    >
      {segments ? renderSegments(segments, children, sideLength) : null}
    </div>
  );
};
