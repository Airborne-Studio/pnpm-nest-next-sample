import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  home() {
    return {};
  }

  @Get('health-check')
  healthCheck() {
    return {
      healthy: true,
    };
  }
}
