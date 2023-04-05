import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { cahoots, cahootsMutations } from './cahoots';
import { interests, interestsMutations } from './interests';
import { markets } from './markets';
import { users } from './users';

export const queries = mergeQueryKeys(
  cahoots,
  markets,
  cahootsMutations,
  interestsMutations,
  interests,
  users
);
