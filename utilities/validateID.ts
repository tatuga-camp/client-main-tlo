export function isUUIDv4(inputString: string): boolean {
  const uuidv4Pattern: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidv4Pattern.test(inputString);
}

export function isMongoDBId(inputString: string): boolean {
  const mongodbIdPattern: RegExp = /^[0-9a-f]{24}$/i;
  return mongodbIdPattern.test(inputString);
}
