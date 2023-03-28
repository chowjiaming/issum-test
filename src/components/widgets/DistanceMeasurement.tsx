/* eslint-disable */
import {createRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';
import {CalcitePanel} from '@esri/calcite-components-react';

interface DistanceMeasurementProps {
  view: __esri.MapView;
}

export const DistanceMeasurement: React.FC<DistanceMeasurementProps> = ({
  view,
}) => {
  const distanceMeasurementRef = createRef<HTMLCalcitePanelElement>();

  useEffect(() => {
    let distanceMeasurement: __esri.DistanceMeasurement2D;

    loadModules(['esri/widgets/DistanceMeasurement2D']).then(
      ([DistanceMeasurement2D]) => {
        distanceMeasurement = new DistanceMeasurement2D({
          view,
          container: distanceMeasurementRef.current,
        });
      }
    );

    return () => {
      if (distanceMeasurement) {
        distanceMeasurement.destroy();
      }
    };
  }, [view, distanceMeasurementRef]);

  return <CalcitePanel ref={distanceMeasurementRef}></CalcitePanel>;
};

DistanceMeasurement.displayName = 'DistanceMeasurement';
