import { apiClient } from "../client";
import { PaginationParams } from "../dto/common";
import { AddMemberRequestDto } from "../dto/projectApi";
import {
  CreateProjectDto,
  ProjectMemberDto,
  ProjectResponseDto,
  ProjectRole,
  ProjectStatsDto,
  ProjectStatus,
  UpdateProjectDto,
} from "../dto/projects";
import { ProjectListResponseDto, TemplateListResponseDto } from "../dto/response";
import { TemplateResponseDto } from "../dto/templates";
import { ENDPOINTS } from "../endpoints";

export const projectService = {
  createProject: (data: CreateProjectDto) => apiClient.post<ProjectResponseDto>(ENDPOINTS.PROJECTS.BASE, data),

  getProjects: (params?: PaginationParams & { status?: ProjectStatus }) =>
    apiClient.get<ProjectListResponseDto>(ENDPOINTS.PROJECTS.BASE, { params }),

  getProject: (id: string) => apiClient.get<ProjectResponseDto>(`${ENDPOINTS.PROJECTS.BASE}/${id}`),

  updateProject: (id: string, data: UpdateProjectDto) =>
    apiClient.patch<ProjectResponseDto>(`${ENDPOINTS.PROJECTS.BASE}/${id}`, data),

  deleteProject: (id: string) => apiClient.delete(`${ENDPOINTS.PROJECTS.BASE}/${id}`),

  toggleFavorite: (projectId: string) =>
    apiClient.post<ProjectResponseDto>(ENDPOINTS.PROJECTS.TOGGLE_FAVORITE(projectId)),

  addMember: (projectId: string, data: AddMemberRequestDto) =>
    apiClient.post<ProjectMemberDto>(ENDPOINTS.PROJECTS.MEMBERS(projectId), data),

  updateMemberRole: (projectId: string, userId: string, role: ProjectRole) =>
    apiClient.patch<ProjectMemberDto>(`${ENDPOINTS.PROJECTS.MEMBERS(projectId)}/${userId}`, { role }),

  removeMember: (projectId: string, userId: string) =>
    apiClient.delete(`${ENDPOINTS.PROJECTS.MEMBERS(projectId)}/${userId}`),

  getProjectTemplates: (projectId: string, params?: PaginationParams) =>
    apiClient.get<TemplateListResponseDto>(ENDPOINTS.PROJECTS.TEMPLATES(projectId), { params }),

  addTemplateToProject: (projectId: string, templateId: string) =>
    apiClient.post<TemplateResponseDto>(`${ENDPOINTS.PROJECTS.TEMPLATES(projectId)}/${templateId}`),

  getProjectStats: (projectId: string) => apiClient.get<ProjectStatsDto>(ENDPOINTS.PROJECTS.STATS(projectId)),
};
