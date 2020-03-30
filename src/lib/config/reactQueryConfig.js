const reactQueryConfig = {
  // Global
  suspense: false,
  useErrorBoundary: undefined, // Defaults to the value of `suspense` if not defined otherwise
  throwOnError: false,
  // useQuery
  retry: false,
  queryFnParamsFilter: (args) => args.slice(1),
};

export default reactQueryConfig;
