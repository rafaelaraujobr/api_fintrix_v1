import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { TypeWallet } from '@prisma/client';
import { IsString, IsEnum, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

enum OrderItem {
  NAME = 'name',
  TYPE = 'type',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}
export class QueryWalletDto {
  @ApiPropertyOptional({ description: 'Nome', type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Id do tenant', type: String })
  @IsString()
  @IsOptional()
  tenant_id?: string;

  @ApiPropertyOptional({ description: 'Id do author', type: String })
  @IsString()
  @IsOptional()
  author_id?: string;

  @ApiPropertyOptional({ description: 'Tipo', enum: TypeWallet })
  @IsEnum(TypeWallet)
  @IsOptional()
  type?: TypeWallet;

  @ApiPropertyOptional({ description: 'Campo de busca', type: String })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Itens apagados', type: String })
  @IsString()
  @IsOptional()
  deleted?: string;

  @ApiPropertyOptional({ description: 'Inicio data de criação', type: String })
  @IsDateString()
  @Transform(({ value }) => (value ? new Date(value).toISOString() : undefined))
  @IsOptional()
  start_date?: string;

  @ApiPropertyOptional({ description: 'Final data de criação', type: String })
  @IsDateString()
  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      date.setDate(date.getDate() + 1);
      return date.toISOString();
    }
    return undefined;
  })
  @IsOptional()
  end_date?: string;

  @ApiPropertyOptional({ description: 'Retorna todos os registros não paginados', type: Boolean })
  @IsBoolean()
  @Transform(({ value }) => (value && value === 'true' ? true : false))
  @IsOptional()
  not_paginated?: boolean;

  @ApiPropertyOptional({ description: 'Pagina', type: String })
  @IsString()
  @IsOptional()
  page?: string;

  @ApiPropertyOptional({ description: 'Limite de registros', type: String })
  @IsString()
  @IsOptional()
  limit?: string;

  @ApiPropertyOptional({ description: 'asc | desc', enum: Sort })
  @IsEnum(Sort)
  @IsOptional()
  sort?: string;

  @ApiPropertyOptional({ description: 'Ordernar por', enum: OrderItem })
  @IsEnum(OrderItem)
  @IsOptional()
  order: string;
}
