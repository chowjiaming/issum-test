import React, {useState} from 'react';

import {Map} from '@/components/Map';
import {Toolbar} from '@/components/Toolbar';
import {Card} from '@/components/shared/Card';

import {LayerList} from '@/components/widgets/LayerList';
import {Legend} from '@/components/widgets/Legend';
import {DistanceMeasurement} from '@/components/widgets/DistanceMeasurement';
import {BasemapGallery} from '@/components/widgets/BasemapGallery';
import {CoordinateConversion} from '@/components/widgets/CoordinateConversion';
import {Daylight} from '@/components/widgets/Daylight';
import {Slice} from '@/components/widgets/Slice';

import {portalId} from '@/utils/config';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '@/App.css';

const App: React.FC = () => {
  const [view, setView] = useState<__esri.MapView | null>(null);
  const [activeAction, setActiveAction] = useState<string>('');

  const handleActionClick = (action: string) => {
    setActiveAction((prevAction) => (prevAction === action ? '' : action));
  };

  return (
    <div className="app">
      <Toolbar onActionClick={handleActionClick} />
      <Map
        portalId={portalId}
        onViewReady={(view) => {
          setView(view);
        }}
      />
      {view && (
        <>
          {activeAction === 'Layers' && <LayerList view={view} />}
          {activeAction === 'Basemaps' && <BasemapGallery view={view} />}
          {activeAction === 'Legend' && <Legend view={view} />}
          {activeAction === 'Coordinates' && (
            <Card
              title="Coordinates"
              content={<CoordinateConversion view={view} />}
            />
          )}
          {activeAction === 'Distance' && (
            <Card
              title="Distance"
              content={<DistanceMeasurement view={view} />}
            />
          )}
          {activeAction === 'Daylight' && (
            <Card
              title="Daylight"
              content={<Daylight view={view as unknown as __esri.SceneView} />}
            />
          )}
          {activeAction === 'Slice' && (
            <Card
              title="Slice"
              content={<Slice view={view as unknown as __esri.SceneView} />}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
