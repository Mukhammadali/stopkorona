import React from 'react'
import { ReactQueryConfigProvider } from 'react-query';
import reactQueryConfig from 'src/lib/config/reactQueryConfig';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';


const ProvidersWrapper = ({element}) => (
  <Provider store={store}>
    <ReactQueryConfigProvider config={reactQueryConfig}>
      {element}
    </ReactQueryConfigProvider>
  </Provider>
)

export default ProvidersWrapper;