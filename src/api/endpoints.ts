export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/users/register",
    LOGOUT: "/auth/logout",
    ACCCOUNT: "/users/me",
  },
  USERS: {
    BASE: "/users",
    PROFILE: "/users/me/profile",
    STARRED: "/users/me/starred",
    ACTIVITY: "/users/me/activity",
  },
  PROJECTS: {
    BASE: "/projects",
    MEMBERS: (projectId: string) => `/projects/${projectId}/members`,
    TEMPLATES: (projectId: string) => `/projects/${projectId}/templates`,
    STATS: (projectId: string) => `/projects/${projectId}/stats`,
    TOGGLE_FAVORITE: (projectId: string) => `/projects/${projectId}/toggle-favorite`,
  },
  TEMPLATES: {
    BASE: "/templates",
    VERSIONS: (templateId: string) => `/templates/${templateId}/versions`,
    ANALYTICS: (templateId: string) => `/templates/${templateId}/analytics`,
    CLONE: (templateId: string) => `/templates/${templateId}/clone`,
    EXPORT: "/templates/export",
  },
  TAGS: {
    BASE: "/tags",
    MERGE: "/tags/merge",
  },
  ANALYTICS: {
    PROJECT: (projectId: string) => `/analytics/projects/${projectId}`,
    GLOBAL: "/analytics/global",
    TEMPLATE: (templateId: string) => `/analytics/templates/${templateId}`,
    USER: "/analytics/user",
  },
  SEARCH: {
    GLOBAL: "/search",
  },
  AUDIT: {
    BASE: "/audit",
    PROJECT: (projectId: string) => `/audit/projects/${projectId}`,
  },
};
