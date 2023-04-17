import {createRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';
import {CalcitePanel} from '@esri/calcite-components-react';

type LegendProps = {
  view: __esri.MapView;
};
export const Legend: React.FC<LegendProps> = ({view}) => {
  const legendRef = createRef<HTMLCalcitePanelElement>();

  useEffect(() => {
    let legend: __esri.Legend;

    loadModules(['esri/widgets/Legend']).then(([Legend]) => {
      legend = new Legend({view, container: legendRef.current});
    });

    return () => {
      if (legend) {
        legend.destroy();
      }
    };
  }, [view, legendRef]);

  return <CalcitePanel ref={legendRef} className="custom-calcite-panel" />;
};

Legend.displayName = 'Legend';
