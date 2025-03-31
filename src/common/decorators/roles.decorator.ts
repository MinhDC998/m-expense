import { ROLES } from '@/common/constants/roles';
import { TValueof } from '@/common/types/common';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (roles: TValueof<typeof ROLES>[]) =>
  SetMetadata(ROLES_KEY, roles);
