import { SetMetadata } from '@nestjs/common';
import { Role } from '../emuns/role.emun';

export const Roles = (...args: Role[]) => SetMetadata('roles', args);
