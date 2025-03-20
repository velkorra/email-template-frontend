import { apiClient } from "../client";
import { EmailAnalyticsDto } from "../dto/analytics";
import { CloneTemplateRequestDto, ExportTemplatesRequestDto } from "../dto/projectApi";
import { TemplateListResponseDto } from "../dto/response";
import {
  CreateTemplateDto,
  TemplateResponseDto,
  TemplateSearchParams,
  TemplateVersionDto,
  UpdateTemplateDto,
} from "../dto/templates";
import { ENDPOINTS } from "../endpoints";

export const templateService = {
  createTemplate: (data: CreateTemplateDto) => apiClient.post<TemplateResponseDto>(ENDPOINTS.TEMPLATES.BASE, data),

  getTemplates: (params?: TemplateSearchParams) =>
    apiClient.get<TemplateListResponseDto>(ENDPOINTS.TEMPLATES.BASE, { params }),

  getTemplate: (id: string) => apiClient.get<TemplateResponseDto>(`${ENDPOINTS.TEMPLATES.BASE}/${id}`),

  updateTemplate: (id: string, data: UpdateTemplateDto) =>
    apiClient.patch<TemplateResponseDto>(`${ENDPOINTS.TEMPLATES.BASE}/${id}`, data),

  deleteTemplate: (id: string) => apiClient.delete(`${ENDPOINTS.TEMPLATES.BASE}/${id}`),

  getTemplateVersions: (templateId: string) =>
    apiClient.get<TemplateVersionDto[]>(ENDPOINTS.TEMPLATES.VERSIONS(templateId)),

  restoreTemplateVersion: (templateId: string, version: number) =>
    apiClient.post<TemplateResponseDto>(`${ENDPOINTS.TEMPLATES.VERSIONS(templateId)}/${version}`),

  cloneTemplate: (templateId: string, data: CloneTemplateRequestDto) =>
    apiClient.post<TemplateResponseDto>(ENDPOINTS.TEMPLATES.CLONE(templateId), data),

  exportTemplates: (data: ExportTemplatesRequestDto) =>
    apiClient.post<Blob>(ENDPOINTS.TEMPLATES.EXPORT, data, {
      responseType: "blob",
    }),

  getTemplateAnalytics: (templateId: string) =>
    apiClient.get<EmailAnalyticsDto>(ENDPOINTS.TEMPLATES.ANALYTICS(templateId)),
};
