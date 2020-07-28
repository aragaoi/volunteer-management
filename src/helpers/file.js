export async function handleImageUrl(image) {
  return (image && image instanceof File) ? await getBase64Url(image) : image;
}

export async function getBase64Url(file) {
  if(!(file instanceof File)) {
    return file;
  }

  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      resolve(event.target.result);
    });
    reader.readAsDataURL(file);
  });
}
