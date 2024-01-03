import supabase, { supabaseUrl } from "./supabase";

 
 

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
 
     throw new Error("Cabins data couldn'\t be loaded!");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImgPatch = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(/[/*?"<>|]/g, '_');

  // https://yvbxnvpalhjrtsfelzww.supabase.co/storage/v1/object/public/cabin-images/cabin-001/2.jpg
  const imagePath = hasImgPatch
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1)create cabin/edit- rewrite for image
  let query = supabase.from("cabins");

  //A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabins data couldn'\t be created!");
  }

  //2)image upload
  if (hasImgPatch) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images") //bucket-name
    //name,actual
    .upload(imageName, newCabin.image);
  //end
  //3)delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploading and the cabin was not created"
    );
  }
  return data;
}
export async function cabinDelete(id) {
  // eslint-disable-next-line no-unused-vars
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be Deleted!");
  }
}