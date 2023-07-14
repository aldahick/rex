import { styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

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

export interface HexSelectSegments {
  topLeft?: React.FC;
  topCenter?: React.FC;
  topRight?: React.FC;
  bottomLeft?: React.FC;
  bottomCenter?: React.FC;
  bottomRight?: React.FC;
}
type HexSegmentsState = Record<keyof HexSelectSegments, HexSegment>;

export interface HexSelectProps {
  children: HexSelectSegments;
  sideLength?: number;
}

export const HexSelect: React.FC<HexSelectProps> = ({
  children,
  sideLength = 250,
}) => {
  const [segments, setSegments] = useState<HexSegmentsState>();
  const containerRef = useRef<HTMLDivElement>(null);
  const halfHeight = sideLength * Math.sin(Math.PI / 3);

  useEffect(() => {
    const left = containerRef.current?.clientLeft;
    const top = containerRef.current?.clientTop;
    if (typeof left !== "number" || typeof top !== "number") {
      return;
    }
    const segments: HexSegmentsState = {
      bottomLeft: {
        left: 0,
        top: halfHeight,
      },
      bottomCenter: {
        left: 0.5 * sideLength,
        top: halfHeight,
      },
      bottomRight: {
        left: sideLength,
        top: halfHeight,
      },
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
    };
    setSegments(segments);
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      style={{ minHeight: halfHeight * 2, minWidth: halfHeight * 2 }}
    >
      {segments
        ? Object.entries(segments).map(([key, { left, top }], index) => {
            const Segment = index % 2 === 0 ? DownSegment : UpSegment;
            const Child = children[key as keyof HexSelectSegments];
            return (
              <Segment
                key={key}
                sx={{
                  minWidth: `${sideLength}px`,
                  minHeight: `${sideLength}px`,
                  left: `${left}px`,
                  top: `${top}px`,
                  "& *": {
                    minHeight: `${sideLength}px`,
                    minWidth: "100%",
                  },
                }}
              >
                {Child ? <Child /> : null}
              </Segment>
            );
          })
        : null}
      {/* {range(6).map((index) => {
        const { angle, left, top, color } = getSegmentPosition(index);
        return (
          <HexSegment
            key={angle}
            style={{
              backgroundColor: color,
              minWidth: `${sideLength}px`,
              minHeight: `${sideLength}px`,
              rotate: `${angle}deg`,
              left: `${left}px`,
              top: `${top}px`,
            }}
          ></HexSegment>
        );
      })} */}
    </div>
  );
};
