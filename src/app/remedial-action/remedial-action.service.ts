import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRemedialActionDto } from './dto/create-remedial-action.dto';
import { UpdateRemedialActionDto } from './dto/update-remedial-action.dto';
import {
  RemedialAction,
  RemedialActionDocument,
} from './schema/remedial-action.schema';

@Injectable()
export class RemedialActionService {
  constructor(
    @InjectModel(RemedialAction.name)
    private readonly remedialActionModel: Model<RemedialActionDocument>,
  ) {}

  async create(createRemedialActionDto: CreateRemedialActionDto) {
    try {
      const existRemedialAction = await this.remedialActionModel.findOne({
        occurrence_id: createRemedialActionDto.occurrence_id,
      });

      if (existRemedialAction) {
        return await this.remedialActionModel.findByIdAndUpdate(
          existRemedialAction._id,
          createRemedialActionDto,
          { new: true },
        );
      }

      const remedialAction = await this.remedialActionModel.create(
        createRemedialActionDto,
      );
      if (!remedialAction)
        throw new NotFoundException('Ação corretiva não criada');
      return remedialAction;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll() {
    try {
      const remedialActions = await this.remedialActionModel.find();
      if (!remedialActions)
        throw new NotFoundException('Ação corretiva não encontradas');
      return remedialActions;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(id: string) {
    try {
      const remedialAction = await this.remedialActionModel.findOne({
        _id: id,
      });
      if (!remedialAction)
        throw new NotFoundException('Ação corretiva não encontrada');
      return remedialAction;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async finOneByOccurrenceId(occurrence_id: string) {
    try {
      const remedialAction = await this.remedialActionModel.findOne({
        occurrence_id: occurrence_id,
      });
      if (!remedialAction)
        throw new NotFoundException('Ação corretiva não encontrada');
      return remedialAction;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(id: string, updateRemedialActionDto: UpdateRemedialActionDto) {
    try {
      const remedialAction = await this.remedialActionModel.findByIdAndUpdate(
        { _id: id },
        updateRemedialActionDto,
        { new: true },
      );
      if (!remedialAction)
        throw new NotFoundException('Ação corretiva não encontrada');
      return remedialAction;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeByOccurrenceId(occurrence_id: string) {
    try {
      const remedialAction = await this.remedialActionModel.findOneAndDelete({
        occurrence_id: occurrence_id,
      });

      if (!remedialAction)
        throw new NotFoundException('Ação corretiva não encontrada');
      return remedialAction;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
