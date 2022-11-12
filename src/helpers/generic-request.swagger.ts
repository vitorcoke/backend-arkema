import { ApiProperty } from '@nestjs/swagger';

export class GenericRequestSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
