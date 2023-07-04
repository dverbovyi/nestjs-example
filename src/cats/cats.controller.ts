import { Controller, Get, Post, Req, Param, Put, Body, NotFoundException, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { Request } from 'express'

import { Cat } from '@prisma/client';
import { CatsService } from './cats.service';
import { CatDTO } from './dto';

@Controller('api/cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  getCats(@Req() req: Request, @Query('owner') owner?: string): Promise<Cat[]> {
    return this.catService.getCats(owner);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat> {
    return this.catService.findCat(id);
  } 

  @Post()
  create(@Body() body: CatDTO): Promise<Cat> {
    return this.catService.createCat(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: CatDTO): Promise<Cat> {
    return this.catService.updateCat(id, body);
  }
  
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Cat> {
    return this.catService.deleteCat(id);
  }
}
