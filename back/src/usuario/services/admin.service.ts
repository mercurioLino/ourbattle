import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { Admin } from "../entities/admin.entity";

@Injectable()
export class AdminService{

  constructor(@InjectRepository(Admin) private repository: Repository<Admin>) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin: Admin = this.repository.create(createAdminDto);
    admin.role = "admin";
    return this.repository.save(admin);
  }
}
