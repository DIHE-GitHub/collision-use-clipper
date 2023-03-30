import { createCollisioner, Point } from '@/utils/collision';
import { useBoolean, useDeepCompareEffect } from 'ahooks';

const collisioner = await createCollisioner();

export function useCollision(poly1: Point[], poly2: Point[]) {
  const [isCollision, { set: setIsCollision }] = useBoolean();

  function onChange(poly1: Point[], poly2: Point[]) {
    const result = collisioner.isCollision(poly1, poly2);
    setIsCollision(result);
  }
  useDeepCompareEffect(() => {
    // console.log('change');
    onChange(poly1, poly2);
  }, [poly1, poly2]);

  return [isCollision];
}
