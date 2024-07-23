import { FileType } from "./type.model";

export type File = {
  id: string;
  createAt: Date;
  updateAt: Date;
  fileType: FileType;
  type: string;
  url: string;
  size: number;
};
