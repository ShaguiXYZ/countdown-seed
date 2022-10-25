import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CountDownModule, NX_COUNTDOWN_SEED } from './countdown';
import { DEFAULT_SEED } from './countdown/seed';

@NgModule({
  imports: [BrowserModule, FormsModule, CountDownModule.forRoot()],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: NX_COUNTDOWN_SEED,
      useValue: DEFAULT_SEED({ from: 40, warnAt: [35, 30, 25, 20, 15], period: 250 }),
    },
  ],
})
export class AppModule {}
