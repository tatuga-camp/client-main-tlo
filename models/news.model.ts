import { NewsType } from "./type.model";

export type News = {
  id: string;
  createAt: string;
  updateAt: string;
  title: string;
  content: string;
  releaseAt: string;
  isPublic: boolean;
  type: NewsType;
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
