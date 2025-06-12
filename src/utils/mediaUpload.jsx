import { createClient } from "@supabase/supabase-js";
import { generateUniqueId, getFileExtension } from "./helperUtils";

const supabase = createClient(
    "https://kzqjkascpxihjjjnlvtm.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cWprYXNjcHhpaGpqam5sdnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MjIwNDYsImV4cCI6MjA2NDk5ODA0Nn0.UlU_mBjX5r0jKlCMPugh5OApfSCtMiSH4I4zG6rMnO8"
);

export function mediaUpload(file){
    const promise = new Promise(
        (resolve, reject) => {
            if (file == null) {
                reject("No File Selected");
            }

            const fileExt = getFileExtension(file.name);
            const newFileName = generateUniqueId("IMG") + "." + fileExt;
            supabase.storage.from("cbc-images").upload(newFileName, file, {
                cacheControl: "3600",
                upsert: false
            }).then(
                () => {
                    const url = supabase.storage.from("cbc-images").getPublicUrl(newFileName).data.publicUrl;
                    resolve(url)
                }
            ).catch(
                (error) => {
                    reject("File Upload Failed");
                }
            )
        }
    );
    
    return promise;
}