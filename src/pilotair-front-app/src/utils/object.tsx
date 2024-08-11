export function createDynamicValueIsKeyObject<T extends string>() {
  type Type = {
    [key in T]: T;
  };
  const target: Type = {} as Type;
  return new Proxy(target, {
    get(_, prop) {
      return prop;
    },
  });
}
