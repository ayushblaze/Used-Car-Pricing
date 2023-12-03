import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // this stepcreates a repository for us
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
