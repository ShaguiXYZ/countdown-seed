import { ModuleWithProviders, NgModule } from '@angular/core';
import { CountDownService, NX_COUNTDOWN_SEED } from '.';
import { DEFAULT_SEED } from './seed';

@NgModule({
  imports: [],
  declarations: [],
  providers: [],
})
export class CountDownModule {
  public static forRoot(): ModuleWithProviders<CountDownModule> {
    return {
      ngModule: CountDownModule,
      providers: [
        CountDownService,
        { provide: NX_COUNTDOWN_SEED, useValue: DEFAULT_SEED() },
      ],
    };
  }
}
