// universal version
// import it with
import * as clipperLib from 'js-angusj-clipper'; // es6 / typescript

export interface Point {
  x: number;
  y: number;
}

export async function createCollisioner() {
  // create an instance of the library (usually only do this once in your app)
  const clipper = await clipperLib.loadNativeClipperLibInstanceAsync(
    // let it autodetect which one to use, but also available WasmOnly and AsmJsOnly
    clipperLib.NativeClipperLibRequestedFormat.WasmWithAsmJsFallback,
  );

  return {
    isCollision: (poly1: Point[], poly2: Point[]) => {
      // const poly1 = [
      //   { x: 0, y: 0 },
      //   { x: 10, y: 0 },
      //   { x: 10, y: 10 },
      //   { x: 0, y: 10 },
      // ];
      // const poly2 = [
      //   { x: 10, y: 0 },
      //   { x: 20, y: 0 },
      //   { x: 20, y: 10 },
      //   { x: 10, y: 10 },
      // ];
      const polyResult = clipper.clipToPaths({
        clipType: clipperLib.ClipType.Intersection,

        subjectInputs: [{ data: poly1, closed: true }],

        clipInputs: [{ data: poly2 }],

        subjectFillType: clipperLib.PolyFillType.EvenOdd,
      });
      // return polyResult;

      /* polyResult will be:
        [
          [
            { x: 0, y: 0 },
            { x: 20, y: 0 },
            { x: 20, y: 10 },
            { x: 0, y: 10 }
          ]
        ]
      */
      // console.log({ polyResult });
      return polyResult.length !== 0;
    },
  };
}
