export function handleImageUrl(image) {
  return (image && image instanceof File) ? URL.createObjectURL(image) : image;
}
