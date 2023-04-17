import {createRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';
import {CalciteCard} from '@esri/calcite-components-react';

type SliceProps = {
  view: __esri.SceneView;
};
export const Slice: React.FC<SliceProps> = ({view}) => {
  const sliceRef = createRef<HTMLCalciteCardElement>();

  useEffect(() => {
    let slice: __esri.Slice;

    loadModules(['esri/widgets/Slice']).then(([Slice]) => {
      slice = new Slice({view, container: sliceRef.current});
    });

    return () => {
      if (slice) {
        slice.destroy();
      }
    };
  }, [view, sliceRef]);

  return <CalciteCard ref={sliceRef} className="slice-widget" />;
};

Slice.displayName = 'Slice';
