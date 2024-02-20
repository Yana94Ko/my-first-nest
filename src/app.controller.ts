import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BlaBlaService } from './blabla.service';

//데코레이터 : 편리하지만, 해당 데코레이터가 어떤 기능을 추가해주는지는 명시적이지 않음

//클래스 데코레이터
@Controller() //controller 요청을 받도 응답을 보내는것에 책임을 가지고있는 것
export class AppController {
  //nest가 초기화 할 때 뒤에 작성된 것을 타입에 맞춰서 자동으로 찾아서 넣어줌(this.블라블라 = 블라블라)
  constructor(
    private readonly appService: AppService,
    private blaBlaService: BlaBlaService,
  ) {}

  //메서드 데코레이터
  @Get()
  getHello(...args): string {
    console.log(args);
    this.blaBlaService.getHello();
    return this.appService.getHello();
  }
}
