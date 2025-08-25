import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      // Vérifier l'authentification
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Non autorisé");
      }
      
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complet pour l'utilisateur:", metadata.userId);
      console.log("Fichier uploadé:", file.url);
      
      return { uploadedBy: metadata.userId, url: file.url };
    }),
    
  multipleImages: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Non autorisé");
      }
      
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload multiple complet pour l'utilisateur:", metadata.userId);
      console.log("Fichier uploadé:", file.url);
      
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
