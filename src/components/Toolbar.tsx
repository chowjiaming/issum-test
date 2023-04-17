import {
  CalciteAction,
  CalciteActionBar,
  CalciteShell,
  CalciteShellPanel,
} from '@esri/calcite-components-react';

type ToolbarProps = {
  onActionClick: (action: string) => void;
};
export const Toolbar: React.FC<ToolbarProps> = ({onActionClick}) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    onActionClick(target.getAttribute('text') as string);
  };

  return (
    <CalciteShell>
      <CalciteShellPanel slot="primary-panel">
        <CalciteActionBar slot="action-bar">
          <CalciteAction text="Layers" icon="layers" onClick={handleClick} />
          <CalciteAction text="Legend" icon="legend" onClick={handleClick} />
          <CalciteAction
            text="Distance"
            icon="measure-line"
            onClick={handleClick}
          />
          <CalciteAction text="Basemaps" icon="basemap" onClick={handleClick} />
          <CalciteAction
            text="Coordinates"
            icon="compass"
            onClick={handleClick}
          />
          <CalciteAction
            text="Daylight"
            icon="partly-cloudy"
            onClick={handleClick}
          />
          <CalciteAction text="Slice" icon="viewshed" onClick={handleClick} />
          <CalciteAction
            text="Buildings"
            icon="organization"
            onClick={handleClick}
          />
        </CalciteActionBar>
      </CalciteShellPanel>
    </CalciteShell>
  );
};

Toolbar.displayName = 'Toolbar';
