import { IndicatingPoint } from '@/components/Help/IndicatingPoint';
import { Point } from '@/types/point';
import { createCollisioner } from '@/utils/collision';
import { movePoints } from '@/utils/point';
import { ProForm, useDeepCompareEffect } from '@ant-design/pro-components';
import { useSetState } from 'ahooks';
import { Form, InputNumber } from 'antd';
import { useDeepCompareMemo } from 'use-deep-compare';
import styles from './index.less';

const collisioner = await createCollisioner();

// create some polygons (note that they MUST be integer coordinates)
let poly1 = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 10 },
  { x: 0, y: 10 },
];

let poly2 = [
  { x: 10, y: 0 },
  { x: 20, y: 0 },
  { x: 20, y: 10 },
  { x: 10, y: 10 },
];

poly1 = movePoints({ points: poly1, offset: { x: 10, y: 10 } });
poly2 = movePoints({ points: poly2, offset: { x: 10, y: 10 } });

export default function Page() {
  const [state, setState] = useSetState({
    isCollision: false,
    poly1: { position: { x: 0, y: 0 } },
    poly2: { position: { x: 0, y: 0 } },
  });
  const points = {
    poly1: useDeepCompareMemo(
      () => movePoints({ points: poly1, offset: state.poly1.position }),
      [state.poly1.position],
    ),
    poly2: useDeepCompareMemo(
      () => movePoints({ points: poly2, offset: state.poly2.position }),
      [state.poly2.position],
    ),
  };
  function onMove(poly1: Point[], poly2: Point[]) {
    const result = collisioner.isCollision(poly1, poly2);
    setState({ isCollision: result });
  }
  useDeepCompareEffect(() => {
    onMove(points.poly1, points.poly2);
  }, [points]);
  // onMove(points.poly1, points.poly2);
  return (
    <>
      <div>
        <Form<typeof state>
          initialValues={state}
          onValuesChange={(changedValues, values) => {
            // console.log(changedValues, values);
            setState(values);
          }}
        >
          <ProForm.Group title="poly1 position" size={'small'}>
            <Form.Item label="x" name={['poly1', 'position', 'x']}>
              <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item label="y" name={['poly1', 'position', 'y']}>
              <InputNumber></InputNumber>
            </Form.Item>
          </ProForm.Group>
          <ProForm.Group title="poly2 position" size={'small'}>
            <Form.Item label="x" name={['poly2', 'position', 'x']}>
              <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item label="y" name={['poly2', 'position', 'y']}>
              <InputNumber></InputNumber>
            </Form.Item>
          </ProForm.Group>
        </Form>

        <div>isCollision: {String(state.isCollision)}</div>
        <svg width="100" height="100" className={styles.container}>
          <IndicatingPoint points={points.poly1} />
          <IndicatingPoint points={points.poly2} color="red" />
        </svg>
      </div>
    </>
  );
}
