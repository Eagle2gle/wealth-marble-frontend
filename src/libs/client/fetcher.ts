export const fetchCahootDetail = () =>
  fetch(`${process.env.NEXT_PUBLIC_HOST}/cahootDetailData.json`).then((res) => res.json());

export const fetchCahootHistory = () =>
  fetch(`${process.env.NEXT_PUBLIC_HOST}/cahootHistoryData.json`).then((res) => res.json());
