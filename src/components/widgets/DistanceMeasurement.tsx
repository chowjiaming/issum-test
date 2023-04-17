import {createRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';

type DistanceMeasurementProps = {
  view: __esri.MapView;
};
export const DistanceMeasurement: React.FC<DistanceMeasurementProps> = ({
  view,
}) => {
  const distanceMeasurementRef = createRef<HTMLDivElement>();

  useEffect(() => {
    let distanceMeasurement: __esri.DirectLineMeasurement3D;

    loadModules(['esri/widgets/DirectLineMeasurement3D']).then(
      ([DirectLineMeasurement3D]) => {
        distanceMeasurement = new DirectLineMeasurement3D({
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

  return <div ref={distanceMeasurementRef} className="daylight-widget" />;
};

DistanceMeasurement.displayName = 'DistanceMeasurement';
