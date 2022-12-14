import { CountdownSeed } from '.';
import { DEFAULT_COUNT_DOWN_PERIOD, DEFAULT_COUNT_TIMEOUT } from '..';

interface CountDownConfig {
  period: number;
  from: number;
  warnAt?: number[];
}

const DEFAULT_SETTINGS: CountDownConfig = {
  from: DEFAULT_COUNT_TIMEOUT,
  period: DEFAULT_COUNT_DOWN_PERIOD,
};

export class DefaultCountdownSeed implements CountdownSeed {
  private _settings: CountDownConfig;
  private currentCount: number;

  constructor(settings?: CountDownConfig) {
    this._settings = { ...DEFAULT_SETTINGS, ...settings };
  }

  private get config(): CountDownConfig {
    return this._settings;
  }

  private set config(config: CountDownConfig) {
    if (config.from > 0) {
      this._settings = config;
    }
  }

  public period = () => this.config.period;
  public next = () => --this.currentCount;
  public hasNext = (): boolean => this.currentCount > 0;
  public warn = () =>
    this.config.warnAt?.some((value) => value === this.currentCount);
  public reset = () => (this.currentCount = this.config.from);
}
