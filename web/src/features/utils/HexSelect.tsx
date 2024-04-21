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
}

interface HexSelectSegment {
  styles?: React.CSSProperties;
  /**
   * Rendered inside a div with:
   *   display: flex
   *   align-items: center
   *   justify-content: center
   *   flex-direction: column
   */
  element: React.ReactNode;
}
export type HexSelectSegments = Partial<{
  topLeft: HexSelectSegment;
  topCenter: HexSelectSegment;
  topRight: HexSelectSegment;
  bottomLeft: HexSelectSegment;
  bottomCenter: HexSelectSegment;
  bottomRight: HexSelectSegment;
}>;
type HexSegmentsState = { [key in keyof HexSelectSegments]?: HexSegment };

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
    topLeft: {
      left: 0,
      top: 0,
    },
    topCenter: {
      left: 0.5 * sideLength,
      top: 0,
    },
    topRight: {
      left: sideLength,
      top: 0,
    },
    bottomLeft: {
      left: 0,
      top: bottomTop,
    },
    bottomCenter: {
      left: 0.5 * sideLength,
      top: bottomTop,
    },
    bottomRight: {
      left: sideLength,
      top: bottomTop,
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
  background: HexSelectProps["background"],
) =>
  Object.entries(segments)
    .filter(([key]) => sideLength >= 350 || key in children)
    .map(([key, { left, top }], index) => {
      const isUp = ["topLeft", "topRight", "bottomCenter"].includes(key);
      const child = children[key as keyof HexSelectSegments];

      if (sideLength < 350) {
        console.log(key, index, !!child?.element);
        if (!child?.element) return null;
        return (
          <Grid
            key={key}
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            style={{
              backgroundColor: background[(index + 1) % 2],
              ...child.styles,
              paddingTop: "1em",
              paddingBottom: "1em",
            }}
          >
            {child.element}
          </Grid>
        );
      }

      const Segment = isUp ? UpSegment : DownSegment;
      const sizeStyles: CSSProperties = {
        minWidth: `${sideLength}px`,
        minHeight: `${sideLength}px`,
      };
      const positionStyles: CSSProperties = {
        position: "fixed",
        left: `${left}px`,
        top: `${top}px`,
      };
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
            sx={{
              backgroundColor: background[Number(isUp)],
              ...sizeStyles,
              ...(child?.styles ?? {}),
            }}
          >
            {child?.element}
          </Grid>
        </Segment>
      );
    });

export interface HexSelectProps {
  background: [string, string];
  children: HexSelectSegments;
}

export const HexSelect: React.FC<HexSelectProps> = ({
  background,
  children,
}) => {
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
      {segments
        ? renderSegments(segments, children, sideLength, background)
        : null}
    </div>
  );
};
