import React, {useState} from 'react';
import './App.css';
import {Map} from './components/map/Map';
import {Toolbar} from './components/widgets/Toolbar';
import {LayerList} from './components/widgets/LayerList';
import {Legend} from './components/widgets/Legend';
import {DistanceMeasurement} from './components/widgets/DistanceMeasurement';
import {Search} from './components/widgets/Search';

const portalId = '6461e5ef16134471a31be979cf182794';

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