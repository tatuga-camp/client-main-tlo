export const filterBase64Image = (content: string): string[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const imageElements = doc.getElementsByTagName("img");

  const imageUrls = Array.from(imageElements)
    .map((img) => {
      const src = img.src;
      if (src.startsWith("data:image")) {
        // Check if the src attribute starts with "data:image" (base64 image)
        return src;
      } else {
        return null; // Skip images with actual URLs
      }
    })
    .filter((src): src is string => src !== null); // Filter out null values and ensure type is string

  return imageUrls;
};
