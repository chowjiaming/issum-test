import {useEffect, useRef} from 'react';
import {loadModules} from 'esri-loader';

type MapProps = {
  portalId: string;
  onViewReady?: (view: __esri.MapView) => void;
};
export const Map = ({portalId, onViewReady}: MapProps) => {
  const mapEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const [
        EsriWebScene,
        EsriSceneView,
        EsriSearch,
        EsriBasemapToggle,
        EsriLayerList,
        EsriLegend,
        EsriExpand,
        EsriHome,
        EsriFullscreen,
        EsriAreaMeasurement3D,
        EsriDirectLineMeasurement3D,
        EsriBuildingSceneLayer,
        EsriBuildingExplorer,
      ] = await loadModules(
        [
          'esri/WebScene',
          'esri/views/SceneView',
          'esri/widgets/Search',
          'esri/widgets/BasemapToggle',
          'esri/widgets/LayerList',
          'esri/widgets/Legend',
          'esri/widgets/Expand',
          'esri/widgets/Home',
          'esri/widgets/Fullscreen',
          'esri/widgets/AreaMeasurement3D',
          'esri/widgets/DirectLineMeasurement3D',
          'esri/layers/BuildingSceneLayer',
          'esri/widgets/BuildingExplorer',
        ],
        {
          css: true,
        }
      );

      let view: typeof EsriSceneView | null = null;

      const map = new EsriWebScene({
        portalItem: {
          id: portalId,
        },
      });

      const buildingLayer = new EsriBuildingSceneLayer({
        url: 'https://tiles.arcgis.com/tiles/As5CFN3ThbQpy8Ph/arcgis/rest/services/Schulich/SceneServer',
        title: 'Schulich School of Business',
      });

      // const buildingLayer2 = new EsriBuildingSceneLayer({
      //   url: 'https://tiles.arcgis.com/tiles/As5CFN3ThbQpy8Ph/arcgis/rest/services/Bergeron/SceneServer',
      //   title: 'Bergeron',
      // });

      map.add(buildingLayer);
      // map.add(buildingLayer2);

      view = new EsriSceneView({
        container: mapEl.current as HTMLDivElement,
        map: map,
        camera: {
          position: [-79.5019, 43.7735, 500], // campus coordinates
          heading: 180,
          tilt: 45,
        },
        ui: {
          components: ['navigation-toggle', 'compass', 'zoom'],
        },
      });

      await view.when();

      if (onViewReady) {
        onViewReady(view);
      }

      const buildingExplorer = new EsriBuildingExplorer({
        view,
        layers: [buildingLayer],
      });
      // const buildingExplorer2 = new EsriBuildingExplorer({
      //   view,
      //   layers: [buildingLayer2],
      // });

      view.ui.add(buildingExplorer, 'top-right');
      // view.ui.add(buildingExplorer2, 'top-right');

      const homeWidget = new EsriHome({view});
      view.ui.add(homeWidget, 'top-left');
      // const areaMeasureWidget3D = new EsriAreaMeasurement3D({view});
      // view.ui.add(areaMeasureWidget3D, 'top-right');
      // const distanceMeasureWidget3D = new EsriDirectLineMeasurement3D({
      //   view,
      // });
      // view.ui.add(distanceMeasureWidget3D, 'top-right');
      console.log(map.layers.getItemAt(3));

      // console.log(map.layers.map((layer) => layer.title));

      const searchWidget = new EsriSearch({
        view,
        sources: [
          {
            layer: map.layers.getItemAt(3),
            searchFields: ['Name'],
            displayField: 'Name',
            exactMatch: false,
            outFields: ['*'],
            name: 'Buildings',
            placeholder: 'Search for a building...',
            autoSelect: true,
            zoomScale: 100,
          },
        ],
        locationEnabled: false,
        includeDefaultSources: false,
      });
      view.ui.add(searchWidget, 'top-right');
      const fullscreenWidget = new EsriFullscreen({view});
      view.ui.add(fullscreenWidget, 'bottom-right');
      // const basemapToggle = new EsriBasemapToggle({
      //   view,
      //   nextBasemap: 'satellite',
      // });
      // view.ui.add(basemapToggle, 'bottom-right');
      // const layerList = new EsriLayerList({view});
      // const layerListExpand = new EsriExpand({
      //   view,
      //   content: layerList,
      //   group: 'top-right',
      // });
      // view.ui.add(layerListExpand, 'top-right');
      // const legend = new EsriLegend({view});
      // const legendExpand = new EsriExpand({
      //   view,
      //   content: legend,
      //   group: 'top-left',
      // });
      // view.ui.add(legendExpand, 'top-right');

      return () => {
        if (view) {
          view.destroy();
          view = null;
        }
      };
    };

    if (mapEl.current) {
      initializeMap();
    }
  }, [portalId]);

  return <div className="map" ref={mapEl} />;
};
