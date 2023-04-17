import {createRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';

type BuildingExplorerProps = {
  view: __esri.SceneView;
};
export const BuildingExplorer: React.FC<BuildingExplorerProps> = ({view}) => {
  const buildingExplorerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    let buildingExplorer: __esri.BuildingExplorer;

    loadModules([
      'esri/widgets/BuildingExplorer',
      'esri/layers/BuildingSceneLayer',
    ]).then(([BuildingExplorer, EsriBuildingSceneLayer]) => {
      const buildingLayer = new EsriBuildingSceneLayer({
        url: 'https://tiles.arcgis.com/tiles/As5CFN3ThbQpy8Ph/arcgis/rest/services/Schulich/SceneServer',
        title: 'Schulich School of Business',
      });

      buildingExplorer = new BuildingExplorer({
        view,
        layers: [buildingLayer],
        container: buildingExplorerRef.current,
      });
    });

    return () => {
      if (buildingExplorer) {
        buildingExplorer.destroy();
      }
    };
  }, [view, buildingExplorerRef]);

  return <div ref={buildingExplorerRef} className="building-explorer-widget" />;
};

BuildingExplorer.displayName = 'BuildingExplorer';
