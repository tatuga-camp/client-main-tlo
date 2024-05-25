export type News = {
  id: string;
  createAt: string;
  updateAt: string;
  title: string;
  content: string;
  isPublic: boolean;
};

export type FileOnNews = {
  id: string;
  createAt: string;
  updateAt: string;
  type: string;
  url: string;
  size: number;
  newsId: string;
};
