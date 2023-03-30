export interface Point {
  x: number;
  y: number;
}
// IndicatingPoint
export function IndicatingPoint({
  points,
  color = 'green',
}: {
  points: Point[];
  color?: string;
}) {
  return (
    <g fill={color} stroke="black" opacity={0.5}>
      {points.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r="2"></circle>
      ))}
    </g>
  );
}
