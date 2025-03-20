import { apiClient } from "../client";
import { ProjectAnalyticsDto, GlobalAnalyticsDto } from "../dto/analytics";
import { ENDPOINTS } from "../endpoints";

export const analyticService = {
  getProjectAnalytics: (projectId: string) =>
    apiClient.get<ProjectAnalyticsDto>(ENDPOINTS.ANALYTICS.PROJECT(projectId)),

  getGlobalAnalytics: () => apiClient.get<GlobalAnalyticsDto>(ENDPOINTS.ANALYTICS.GLOBAL),
};
