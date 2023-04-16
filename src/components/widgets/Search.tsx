import {createRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';
import {CalcitePanel} from '@esri/calcite-components-react';

type SearchProps = {
  view: __esri.MapView;
};
export const Search: React.FC<SearchProps> = ({view}) => {
  const searchRef = createRef<HTMLCalcitePanelElement>();

  useEffect(() => {
    let search: __esri.widgetsSearch;

    loadModules(['esri/widgets/Search']).then(([Search]) => {
      search = new Search({view, container: searchRef.current});
    });

    return () => {
      if (search) {
        search.destroy();
      }
    };
  }, [view, searchRef]);

  return <CalcitePanel ref={searchRef} />;
};

Search.displayName = 'Search';
