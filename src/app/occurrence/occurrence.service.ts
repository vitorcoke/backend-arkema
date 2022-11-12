import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';
import { UpdateOccurrenceDto } from './dto/update-occurrence.dto';
import { Occurrence, OccurrenceDocument } from './schema/occurrence.schema';
import { UserService } from '../user/user.service';
import { ClientKafka } from '@nestjs/microservices';
import { SendEmailOccurrenceDto } from './dto/send-mail-occurrence.dto';

@Injectable()
export class OccurrenceService {
  constructor(
    @InjectModel(Occurrence.name)
    private readonly occurrenceModel: Model<OccurrenceDocument>,
    private readonly userService: UserService,
    @Inject('MAIL_SERVICE') private readonly mail: ClientKafka,
  ) {}

  async create(createOccurrenceDto: CreateOccurrenceDto) {
    try {
      const occurrence = await this.occurrenceModel.create(createOccurrenceDto);
      if (!occurrence) throw new NotFoundException('Ocorrencia não criada');
      return occurrence;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll() {
    try {
      const occurrences = await this.occurrenceModel.find();
      if (!occurrences)
        throw new NotFoundException('Ocorrencias não encontradas');
      return occurrences;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async sendMail(sendEmailOccurrenceDto: SendEmailOccurrenceDto) {
    try {
      const users = await this.userService.findUserById(
        sendEmailOccurrenceDto.responsible_id,
      );

      if (users.length > 0) {
        users.forEach(async (user) => {
          this.mail.emit('send-mail', {
            to: user.email,
            name: user.name,
            id: sendEmailOccurrenceDto.occurrence_id,
          });
        });
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(id: string, updateOccurrenceDto: UpdateOccurrenceDto) {
    try {
      const occurrence = await this.occurrenceModel.findByIdAndUpdate(
        { _id: id },
        updateOccurrenceDto,
        { new: true },
      );
      if (!occurrence) throw new NotFoundException('Ocorrencia não encontrada');
      return occurrence;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async remove(id: string) {
    try {
      const occurrence = await this.occurrenceModel.findByIdAndDelete(id);
      if (!occurrence) throw new NotFoundException('Ocorrencia não encontrada');
      return occurrence;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
