import {createRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';
import {CalcitePanel} from '@esri/calcite-components-react';

type BasemapGalleryProps = {
  view: __esri.MapView;
};
export const BasemapGallery: React.FC<BasemapGalleryProps> = ({view}) => {
  const basemapGalleryRef = createRef<HTMLCalcitePanelElement>();

  useEffect(() => {
    let basemapGallery: __esri.BasemapGallery;

    loadModules(['esri/widgets/BasemapGallery']).then(([BasemapGallery]) => {
      basemapGallery = new BasemapGallery({
        view,
        container: basemapGalleryRef.current,
      });
    });

    return () => {
      if (basemapGallery) {
        basemapGallery.destroy();
      }
    };
  }, [view, basemapGalleryRef]);

  return (
    <CalcitePanel ref={basemapGalleryRef} className="custom-calcite-panel" />
  );
};

BasemapGallery.displayName = 'BasemapGallery';
