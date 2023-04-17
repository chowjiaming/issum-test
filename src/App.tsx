import React, {useState} from 'react';
import {Map} from '@/components/Map';
import {Toolbar} from '@/components/Toolbar';
import {LayerList} from '@/components/widgets/LayerList';
import {Legend} from '@/components/widgets/Legend';
import {DistanceMeasurement} from '@/components/widgets/DistanceMeasurement';
import {Search} from '@/components/widgets/Search';

import {portalId} from '@/utils/config';
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
          {activeAction === 'Legend' && <Legend view={view} />}
          {activeAction === 'Distance' && <DistanceMeasurement view={view} />}
          {activeAction === 'Search' && <Search view={view} />}
        </>
      )}
    </div>
  );
};

export default App;
