import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useEffectOnce = (
  effect: EffectCallback,
  dependencies: DependencyList,
  condition: boolean = true
) => {
  const isSubsequentRender = useRef(false);

  useEffect(() => {
    if (!condition || isSubsequentRender.current) {
      return undefined;
    }

    isSubsequentRender.current = true;

    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies.concat(condition));
};

export default useEffectOnce;
