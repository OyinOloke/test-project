import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({imports:[UsersModule,
JwtModule.registerAsync({
  global:true,
  inject:[ConfigService],
  useFactory: (ConfigService:ConfigService)=>({
    secret:ConfigService.get<string>('JWT_SECRET'),
    signOptions:{expiresIn:'1d'},
  })
  
})
],
  controllers: [AuthController],
  providers: [AuthService,]
})
export class AuthModule {}
