
export const uploadImage = async (imageUri: string) => {
  try {
    console.log("uploading:", imageUri);

    // Extract file name and type from URI
    const fileName = imageUri.split("/").pop() || `image_${Date.now()}.jpg`;
    const fileType = fileName.split(".").pop()?.toLowerCase();
    const mimeType = fileType ? `image/${fileType}` : "image/jpeg";

    // Prepare the image file object
    const imageFile = {
      uri: imageUri,
      name: fileName,
      type: mimeType,
    };

    // Create FormData and append the image file
    const formData = new FormData();
    formData.append("file", imageFile as any);

    // Perform fetch request
    const uploadResponse = await fetch(`https://blosom-tv-server.onrender.com/UploadImage`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed with status: ${uploadResponse.status}`);
    }

    const responseData = await uploadResponse.json();
    console.log("Upload Successful:", responseData);

    return responseData;
  } catch (error: any) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
