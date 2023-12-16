import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({ where: {id} });
  }

  find(email: string) {
    return this.repo.find({ where: {email} });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne({ where: {id} });
    if (!user) {
      throw new Error("user not found");
    } 
    Object.assign(user, attrs);
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: {id} });
    if (!user) {
      throw new Error("user not found");
    }
    return this.repo.remove(user);
  }
}
