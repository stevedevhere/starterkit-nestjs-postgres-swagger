import { ReflectMetadata } from '@nestjs/common';

export const AuthOptions = (...options: string[]) => ReflectMetadata('options', options);
