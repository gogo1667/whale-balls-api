import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get()
  getAllScores() {
    return this.scoresService.getAllScores();
  }

  @Post()
  createScore(@Body() body: { name: string; score: number }) {
    return this.scoresService.createScore(body);
  }
}
