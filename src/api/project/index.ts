import { defHttp } from "/@/utils/http/axios";
import { ListRequest, ListResult } from "../model/baseModel";
import { Project } from "./model";

export enum Api {
  // project
  UpdateProject = "/project/update",
  DeleteProject = "/project/delete",
  ProjectDetail = "/project/detail",
  GetProjectList = "/project/list",
  CreateProject = "/project/create",
}

export const getProjectListApi = (params: ListRequest<{ type: string }>) => {
  return defHttp.get<ListResult<Project>>({ url: Api.GetProjectList, params });
};

export const getProjectApi = (id: number) => {
  return defHttp.get<Project>({ url: `${Api.ProjectDetail}/${id}` });
};

export const createProjectApi = (params: Project) => {
  return defHttp.post<boolean>({ url: Api.CreateProject, params });
};
export const updateProjectApi = (params: Project) => {
  return defHttp.post<boolean>({ url: Api.UpdateProject, params });
};
export const deleteProjectApi = (id: number) => {
  return defHttp.post<boolean>({ url: `${Api.DeleteProject}/${id}` });
};
