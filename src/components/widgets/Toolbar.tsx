/* eslint-disable */
import '@esri/calcite-components/dist/calcite/calcite.css';
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
          <CalciteAction
            text="Layers"
            icon="layers"
            onClick={handleClick}
          ></CalciteAction>
          <CalciteAction
            text="Legend"
            icon="legend"
            onClick={handleClick}
          ></CalciteAction>
          <CalciteAction
            text="Distance"
            icon="measure-line"
            onClick={handleClick}
          ></CalciteAction>
          <CalciteAction
            text="Search"
            icon="search"
            onClick={handleClick}
          ></CalciteAction>
        </CalciteActionBar>
      </CalciteShellPanel>
    </CalciteShell>
  );
};

Toolbar.displayName = 'Toolbar';
