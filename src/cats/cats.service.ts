import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { Cat } from '@prisma/client';
import { CatDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}
  
  getCats(owner?: string): Promise<Cat[]> {
    return this.prisma.cat.findMany({
      where: {
        owner,
      }
    })
  }

  async findCat(id: number): Promise<Cat> {
    const cat = await this.prisma.cat.findUnique({
      where: { id }
    })
    if(!cat) throw new NotFoundException()
    return cat
  }

  async updateCat(id: number, catDTO: CatDTO): Promise<Cat> {
    const cat = await this.prisma.cat.update({
      where: { id },
      data: catDTO
    })
    if (!cat) throw new NotFoundException()
    return cat
  }

  createCat(catDTO: CatDTO): Promise<Cat> {
    return this.prisma.cat.create({data: catDTO});
  }
  
  async deleteCat(id: number): Promise<Cat> {
    try {
      const cat = await this.prisma.cat.delete({
        where: { id },
      })
      return cat
    } catch(e) {
      switch(e.code) {
        case 'P2025': throw new NotFoundException(`a record with id ${id} was not found`)
      }
      throw e
    }
  }
}
