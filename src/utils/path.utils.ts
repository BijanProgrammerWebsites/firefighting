export function picturePath(picture: unknown): string {
  if (typeof picture !== "string") {
    return "";
  }

  return process.env.NEXT_PUBLIC_API_BASE_URL + "/pictures/" + picture;
}
