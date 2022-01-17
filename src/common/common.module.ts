import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'src/user/user.module';
import { ApiKeyGuard } from './guards/api-key.guard';

@Module({
    providers: [{provide: APP_GUARD, useClass: ApiKeyGuard}],
    imports: [UserModule]
})
export class CommonModule {}
