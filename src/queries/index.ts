import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { cahoots, cahootsMutations } from './cahoots';
import { interests, interestsMutations } from './interests';
import { markets } from './markets';
export const queries = mergeQueryKeys(
  cahoots,
  markets,
  cahootsMutations,
  interestsMutations,
  interests,
);
