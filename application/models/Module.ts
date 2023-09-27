export interface Module {
    id?: number,
    name: string,
    alias: string,
    alert: number,
    section_type?: string,
}

export interface SettingModule {
  name: string;
  alias: string;
}