export interface User {
  id: number
  username: string
  email: string
  createAt: Date
  updateAt: Date
  role: Role
  enabled: boolean
}
export const UserUtils = {
  toEntity: (dto: any) => {
    return {
      id: dto.id,
      username: dto.username,
      email: dto.email,
      createAt: new Date(dto.create_at),
      updateAt: new Date(dto.update_at),
      role: dto.role as Role,
      enabled: dto.enabled,
    }
  },
}

export interface UserLoginInput {
  email: string
  password: string
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  UNIVERSITY = 'UNIVERSITY',
}
