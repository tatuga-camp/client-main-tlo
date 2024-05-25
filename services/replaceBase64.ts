import { Base64ToFile } from "../utilities/base64ToFile";
import { GetSignURLService, UploadSignURLService } from "./google-storage";
import { CreateFileNewsService } from "./news/file-news";

export const replaceBase64WithNewContentService = async ({
  base64,
  content,
}: {
  base64: string[];
  content: string;
}): Promise<{
  content: string;
  files: { url: string; file: File }[];
}> => {
  try {
    if (base64.length === 0) return { content, files: [] };
    const fileImageFromBase64 = await Base64ToFile({
      imagesBase64: base64,
    });
    let files: {
      url: string;
      file: File;
    }[] = [];
    let updatedContent = content;
    for (const file of fileImageFromBase64) {
      const getSignURL = await GetSignURLService({
        fileName: file.file?.name as string,
        fileType: file.file?.type as string,
      });

      await UploadSignURLService({
        contentType: file.file?.type as string,
        file: file.file as File,
        signURL: getSignURL.signURL,
      });

      const base64Image = file.base64;
      const imageUrl = getSignURL.originalURL;
      updatedContent = updatedContent.replace(base64Image, imageUrl);
      files.push({
        url: imageUrl,
        file: file.file,
      });
    }
    return {
      content: updatedContent as string,
      files,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
