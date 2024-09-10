import type { UploadProps, UploadFile } from "ant-design-vue";

export type Project = {
  id?: number;
  type?: "completed" | "onGoing";
  title?: string;
  subtitle?: string;
  location?: string;
  description?: string;

  projectImages: string[];
  materials: ProjectMaterial[];
};

export type ProjectMaterial = {
  projectId?: number;
  title?: string;
  subtitle?: string;
  image: string;
  taxType: string;
};

export type ProjectVO = Omit<Project, "projectImages" | "materials"> & {
  projectImages?: UploadProps["fileList"] | UploadFile[];
  materials: ProjectMaterialVO[];
};

export type ProjectMaterialVO = Omit<ProjectMaterial, "image"> & {
  image: UploadProps["fileList"] | UploadFile[];
};
