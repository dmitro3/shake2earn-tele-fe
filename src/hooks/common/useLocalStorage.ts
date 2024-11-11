import { useCallback, useState } from 'react';

import storage from 'utils/storage';

function useLocalStorage<T>(
  key: string,
): readonly [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>,
];
function useLocalStorage<T>(
  key: string,
  initialValue?: T,
): readonly [T, React.Dispatch<React.SetStateAction<T>>];
function useLocalStorage<T>(key: string, initialValue?: T) {
  const getValue = useCallback(() => {
    const value = storage.getJSON<T>(key);
    if (value) {
      return value;
    }
    return initialValue || undefined;
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T | undefined>(getValue);

  const setValue = useCallback(
    (value: React.SetStateAction<T | undefined>) => {
      let valueToStore: T | undefined;
      if (value instanceof Function) {
        setStoredValue((prevValue) => {
          valueToStore = value(prevValue);
          storage.setJSON(key, valueToStore);
          return valueToStore;
        });
      } else {
        storage.setJSON(key, value);
      }
    },
    [key],
  );

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
