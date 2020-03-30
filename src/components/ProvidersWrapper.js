import React from 'react'
import { ReactQueryConfigProvider } from 'react-query';
import reactQueryConfig from 'src/lib/config/reactQueryConfig';


const ProvidersWrapper = ({element}) => (
  <ReactQueryConfigProvider config={reactQueryConfig}>
    {element}
  </ReactQueryConfigProvider>
)

export default ProvidersWrapper;