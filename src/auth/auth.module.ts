import { Inject, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import{ APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.middleware';


@Module({imports:[UsersModule,
JwtModule.registerAsync({
  global:true,
  inject:[ConfigService],
  useFactory: (ConfigService:ConfigService)=>({
    secret:ConfigService.get<string>('JWT_SECRET'),
    signOptions:{expiresIn:'1000s'},
  })
  
})
],
  controllers: [AuthController],
  providers: [AuthService,{provide:APP_GUARD, useClass:AuthGuard}]
})
export class AuthModule {}
