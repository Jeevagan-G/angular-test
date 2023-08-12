import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { ReadingListService } from './reading-list.service';

@Controller()
export class ReadingListController {
  constructor(private readonly readingList: ReadingListService) {}

  @Get('/reading-list/')
  async getReadingList(): Promise<ReadingListItem[]> {
    return await this.readingList.getList();
  }

  @Post('/reading-list/')
  async addToReadingList(@Body() item: Book): Promise<void> {
    return await this.readingList.addBook(item);
  }

  @Put('/reading-list/:id/finished')
  async finishedReading(@Param() params): Promise<ReadingListItem> {
    return await this.readingList.finishedReading(params.id);
  }

  @Delete('/reading-list/:id')
  async removeFromReadingList(@Param() params): Promise<void> {
    return await this.readingList.removeBook(params.id);
  }
}
