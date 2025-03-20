import { apiClient } from "../client";
import { AuditLogDto } from "../dto/audit";
import { PaginationParams, ListResponseDto } from "../dto/common";
import { ProjectResponseDto } from "../dto/projects";
import { UserProfileDto } from "../dto/users";
import { ENDPOINTS } from "../endpoints";

export const userService = {
  getProfile: () => apiClient.get<UserProfileDto>(ENDPOINTS.USERS.PROFILE),

  updateProfile: (data: Partial<UserProfileDto>) => apiClient.patch<UserProfileDto>(ENDPOINTS.USERS.PROFILE, data),

  getStarredProjects: () => apiClient.get<ProjectResponseDto[]>(ENDPOINTS.USERS.STARRED),

  // Активность пользователя
  getUserActivity: (params?: PaginationParams) =>
    apiClient.get<ListResponseDto<AuditLogDto>>(ENDPOINTS.USERS.ACTIVITY, { params }),
};
