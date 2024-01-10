import { useCallback, useMemo, useState } from 'react';

export type LoadableState<T> = {
  data: T;
  error: Error | undefined;
  hasError: boolean;
  isLoaded: boolean;
  isLoading: boolean;
  reset: () => void;
  setData: (
    d: T | ((prevState: T) => T),
    options?: { shouldSetLoaded?: boolean }
  ) => void;
  setError: (e: Error, options?: { shouldSetLoaded?: boolean }) => void;
  setLoaded: () => void;
  setLoading: () => void;
};

type Options = {
  initializeAsLoaded: boolean;
};

export const defaultLoadableState = <T>(
  data: T,
  options?: Options
): LoadableState<T> => ({
  data,
  error: undefined,
  hasError: false,
  isLoaded: options?.initializeAsLoaded ?? false,
  isLoading: false,
  reset() {},
  setData() {},
  setError() {},
  setLoaded() {},
  setLoading() {}
});

const defaultOptions: Options = {
  initializeAsLoaded: false
};

/**

 This hook makes provides a common interface to track data that is loaded from
 an API. It comes pre-baked with loaded, loading, and error states.
 *
 @example
 ```
 const {
 data, error, isLoaded, isLoading, setData, setError, setLoading
 } = useLoadableState(false);
 *
 useEffect(() => {
 setLoading();
 *
 fetch('https://example.com%27/)
 .then(res => res.json())
 .then(res => setData(res.isCool))
 .catch(setError);
 }, [setData, setError, setLoading]);
 *
 return { data, error, isLoaded, isLoading };
 ```
 */

const useLoadableState = <T>(
  defaultData: T,
  options: Partial<Options> = {}
): LoadableState<T> => {
  const opts: Options = { ...defaultOptions, ...options };

  const [initialData] = useState<T>(defaultData);
  const [data, setDataState] = useState<T>(initialData);
  const [error, setErrorState] = useState<Error | undefined>();
  const [isLoaded, setLoadedState] = useState(opts.initializeAsLoaded);
  const [isLoading, setLoadingState] = useState(false);

  const reset = useCallback(() => {
    setDataState(initialData);
    setErrorState(undefined);
    setLoadedState(false);
    setLoadingState(false);
  }, [initialData]);

  const setData = useCallback(
    (d: T | ((prevState: T) => T), { shouldSetLoaded = true } = {}) => {
      setDataState(d);
      setErrorState(undefined);
      if (shouldSetLoaded) {
        setLoadedState(true);
        setLoadingState(false);
      }
    },
    []
  );

  const setError = useCallback((e: Error, { shouldSetLoaded = true } = {}) => {
    setErrorState(e);
    if (shouldSetLoaded) {
      setLoadedState(true);
      setLoadingState(false);
    }
  }, []);

  const setLoaded = useCallback(() => {
    setLoadedState(true);
  }, []);

  const setLoading = useCallback(() => {
    setLoadedState(false);
    setLoadingState(true);
    setErrorState(undefined);
  }, []);

  return useMemo<LoadableState<T>>(
    () => ({
      data,
      error,
      hasError: Boolean(error),
      isLoaded,
      isLoading,
      reset,
      setData,
      setError,
      setLoaded,
      setLoading
    }),
    [
      data,
      error,
      isLoaded,
      isLoading,
      reset,
      setData,
      setError,
      setLoaded,
      setLoading
    ]
  );
};

export default useLoadableState;
