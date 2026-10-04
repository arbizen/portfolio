import 'server-only';
import en from '@/data/site/dictionaries/en.json';

/** The site's words. English only now; the argument stays for the pages that pass it. */
export const getDictionary = async (locale?: string) => {
  void locale;
  return en;
};
