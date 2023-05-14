import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import React from "react";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  WithSearch
} from "@elastic/react-search-ui";
import {
  BooleanFacet,
  Layout,
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { SearchDriverOptions } from "@elastic/search-ui";
import axios from 'axios';

const connector = new AppSearchAPIConnector({
  searchKey: "search-wokxta15kv1ndur5ecpudhdw",
  engineName: "searchpoc",
  endpointBase: "https://b81720545b184a168818feab4f7823f6.ent-search.us-central1.gcp.cloud.es.io"
});

const config: SearchDriverOptions = {
  alwaysSearchOnInitialLoad: false,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      route: { raw: {} },
      description: { raw: {}},
      method: { raw: {}},
      Header: {snippet: {}},
      Schema: {raw:{}},
      Error: {raw:{}}
    },
    search_fields: {
      route: {},
      method:{},
      Header:{},
      Schema:{},
      Error: {},
      description: {}
    },
    disjunctiveFacets: [""],
    facets: {}
  }
};

function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={<SearchBox debounceLength={0} />}
                  sideContent={<div></div>}
                  bodyContent={
                    <Results
                      titleField="route"
                      shouldTrackClickThrough
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage options={[10,5]}/>}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}

export default App;