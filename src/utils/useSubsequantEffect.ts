import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * Fire effect every time AFTER the first time the code is run. Also accepts a
 * condition to control when the subsequent effect goes into effect.
 */
const useSubsequentEffect = (
  effect: EffectCallback,
  dependencies: DependencyList,
  condition: boolean = true
) => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!condition) return undefined;

    if (isInitialRender.current) {
      isInitialRender.current = false;

      return undefined;
    }

    return effect();
  }, dependencies.concat(condition)); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useSubsequentEffect;
