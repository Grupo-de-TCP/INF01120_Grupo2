import * as _ from "lodash-es";

const setterPath = <T extends boolean | undefined>(currentPath: string[], set: any, hasIndex?: T) =>
  ((newValue, index) => {
    set((state: any) => {
      if (typeof newValue === "function") newValue = newValue(_.get(state, currentPath));

      const item = state[currentPath.at(0)!];
      const setPath = currentPath.slice(1);
      if (hasIndex && typeof index === "number") setPath.push(String(index));
      return {
        [currentPath.at(0)!]: setPath.length ? _.set(item, setPath, newValue) : newValue,
      };
    });
  }) as T extends true ? (newValue: any, index: number) => void : (newValue: any) => void;

// Função auxiliar recursiva para criar setters
export function createSetters<IT extends object>(obj: IT, set: any, path: string[] = []): Record<string, unknown> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const currentPath = [...path, key];
    const currentPathStr = key;

    if (_.isPlainObject(value)) {
      return {
        ...acc,
        [`${currentPathStr}Set`]: {
          default: setterPath(currentPath, set),
          ...createSetters(value, set, currentPath),
        },
      };
    } else if (Array.isArray(value)) {
      return {
        ...acc,
        [`${currentPathStr}Set`]: {
          default: setterPath(currentPath, set),
          item: setterPath(currentPath, set, true),
          ...(typeof value[0] === "object"
            ? {
                props: (index: number) => createSetters(value[0], set, [...currentPath, String(index)]),
              }
            : {}),
        },
      };
    } else {
      return {
        ...acc,
        [`${currentPathStr}Set`]: setterPath(currentPath, set),
      };
    }
  }, {});
}
