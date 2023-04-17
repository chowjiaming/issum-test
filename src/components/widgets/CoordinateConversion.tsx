import {createRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';
import {CalcitePanel} from '@esri/calcite-components-react';

type CoordinateConversionProps = {
  view: __esri.MapView;
};
export const CoordinateConversion: React.FC<CoordinateConversionProps> = ({
  view,
}) => {
  const coordinateConversionRef = createRef<HTMLCalcitePanelElement>();

  useEffect(() => {
    let coordinateConversion: __esri.CoordinateConversion;

    loadModules(['esri/widgets/CoordinateConversion']).then(
      ([CoordinateConversion]) => {
        coordinateConversion = new CoordinateConversion({
          view,
          container: coordinateConversionRef.current,
        });
      }
    );

    return () => {
      if (coordinateConversion) {
        coordinateConversion.destroy();
      }
    };
  }, [view, coordinateConversionRef]);

  return (
    <CalcitePanel
      ref={coordinateConversionRef}
      className="custom-calcite-panel"
    />
  );
};

CoordinateConversion.displayName = 'CoordinateConversion';
