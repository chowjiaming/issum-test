import {createRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';

type DaylightProps = {
  view: __esri.SceneView;
};
export const Daylight: React.FC<DaylightProps> = ({view}) => {
  const daylightRef = createRef<HTMLDivElement>();

  useEffect(() => {
    let daylight: __esri.Daylight;

    loadModules(['esri/widgets/Daylight']).then(([Daylight]) => {
      daylight = new Daylight({view, container: daylightRef.current});
    });

    return () => {
      if (daylight) {
        daylight.destroy();
      }
    };
  }, [view, daylightRef]);

  return <div ref={daylightRef} className="daylight-widget" />;
};

Daylight.displayName = 'Daylight';
