export const PROVIDER_TYPE = {
  GOOGLE: {
    TEXT: '구글',
  },
} as const;

export const ROLE = {
  ADMIN: {
    TEXT: '관리자',
  },
  USER: {
    TEXT: '일반 사용자',
  },
} as const;

// 공모 진행도
export const STATUS = {
  CAHOOTS_BEFORE: {
    COLOR: 'bg-red',
    TEXT: '취소',
  },
  CAHOOTS_ONGOING: {
    COLOR: 'bg-main',
    TEXT: '진행 중',
  },
  CAHOOTS_CLOSE: {
    COLOR: 'bg-blue',
    TEXT: '완료',
  },
};

// 거래 유형
export const TRANSACTION_TYPE = {
  BUY: {
    COLOR: 'bg-red',
    TEXT: '매수',
  },
  SELL: {
    COLOR: 'bg-blue',
    TEXT: '매도',
  },
};

export const RANK = {
  NAMJAK: {
    TEXT: '남작',
  },
  JAJAK: {
    TEXT: '자작',
  },
  BAEKJAK: {
    TEXT: '백작',
  },
  WHOJAK: {
    TEXT: '후작',
  },
  GONGJAK: {
    TEXT: '공작',
  },
};
