import {createRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';
import {CalcitePanel} from '@esri/calcite-components-react';

type LayerListProps = {
  view: __esri.MapView;
};
export const LayerList: React.FC<LayerListProps> = ({view}) => {
  const layerListRef = createRef<HTMLCalcitePanelElement>();

  useEffect(() => {
    let layerList: __esri.LayerList;

    loadModules(['esri/widgets/LayerList']).then(([LayerList]) => {
      layerList = new LayerList({view, container: layerListRef.current});
    });

    return () => {
      if (layerList) {
        layerList.destroy();
      }
    };
  }, [view, layerListRef]);

  return <CalcitePanel ref={layerListRef} />;
};

LayerList.displayName = 'LayerList';
