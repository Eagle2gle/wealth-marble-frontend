export const PRICE_STATUS_MAP = {
  DOWN: {
    COLOR: 'text-blue',
    TEXT: '▼',
  },
  UP: {
    COLOR: 'text-red',
    TEXT: '▲',
  },
  SAME: {
    COLOR: 'text-grey-middle',
    TEXT: '',
  },
} as const;
