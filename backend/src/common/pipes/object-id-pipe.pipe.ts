import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdPipePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Types.ObjectId {
        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException(`${value} is not a valid mongo id`);
        }
        return new Types.ObjectId(value);
    }
}
