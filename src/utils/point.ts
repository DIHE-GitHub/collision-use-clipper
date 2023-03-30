export interface Point {
  x: number;
  y: number;
}

export function movePoints({
  points,
  offset,
}: {
  points: Point[];
  offset: Point;
}) {
  return points.map((p) => ({ x: p.x + offset.x, y: p.y + offset.y }));
}
