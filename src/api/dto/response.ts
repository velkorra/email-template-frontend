import { ListResponseDto } from "./common";
import { ProjectResponseDto } from "./projects";
import { TemplateResponseDto } from "./templates";
import { UserDto } from "./users";

export interface ProjectListResponseDto extends ListResponseDto<ProjectResponseDto> {
  stats: {
    active: number;
    archived: number;
    totalTemplates: number;
  };
}

export interface TemplateListResponseDto extends ListResponseDto<TemplateResponseDto> {
  categories: Array<{
    name: string;
    count: number;
  }>;
}

export interface AuthResponseDto {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}
