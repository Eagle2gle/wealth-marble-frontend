import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { cahoots, cahootsMutations } from './cahoots';
export const queries = mergeQueryKeys(
  cahoots,
  cahootsMutations,
);
