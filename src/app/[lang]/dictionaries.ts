import 'server-only';

const dictionaries = {
  en: () =>
    import('@/data/site/dictionaries/en.json').then((module) => module.default),
  bn: () =>
    import('@/data/site/dictionaries/bn.json').then((module) => module.default),
  es: () =>
    import('@/data/site/dictionaries/es.json').then((module) => module.default),
};
export const getDictionary = async (locale: any) => {
  if (locale in dictionaries) {
    // @ts-ignore
    return dictionaries[locale]();
  }
};
