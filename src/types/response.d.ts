export type Response<T = null> = {
  status: string;
  message: string | null;
  data: T;
};

export type Interests = {
  result: {
    title: string;
    shortDescription: string;
    location: string;
    picture: {
      createdAt: string;
      updatedAt: string;
      id: number;
      type: string;
      url: string;
    };
  }[];
};
