// Ref: https://stackoverflow.com/questions/70544832/detect-shake-event-with-javascript-with-all-major-browsers-devices-ios-androi

export type ShakeEventData = DeviceMotionEvent;
export type ShakeEvent = CustomEvent<ShakeEventData> & { type: 'shake' };
export type ShakeEventListener = (event: ShakeEvent) => void;

export type ShakeOptions = {
  /**
   * Minimum acceleration needed to dispatch an event:
   * meters per second squared (m/s²).
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/acceleration
   */
  threshold: number;
  /**
   * After a shake event is dispatched, subsequent events will not be dispatched
   * until after a duration greater than or equal to this value (milliseconds).
   */
  duration: number;
};

const defaultOptions: ShakeOptions = { threshold: 5, duration: 500 };

function createEvent<Type extends string, Detail>(
  type: Type,
  detail: Detail,
): CustomEvent<Detail> & { type: Type } {
  return new CustomEvent(type, { detail }) as CustomEvent<Detail> & {
    type: Type;
  };
}

function getMaxAcceleration(event: DeviceMotionEvent): number {
  let max = 0;
  if (event.acceleration) {
    for (const key of ['x', 'y', 'z'] as const) {
      const value = Math.abs(event.acceleration[key] ?? 0);
      if (value > max) max = value;
    }
  }
  return max;
}

export class Shake extends EventTarget {
  #approved?: boolean;
  #threshold: ShakeOptions['threshold'];
  #duration: ShakeOptions['duration'];
  #timeStamp: number;
  #listeners: ShakeEventListener[] = [];

  constructor(options?: Partial<ShakeOptions>) {
    super();
    const { threshold, duration } = { ...options, ...defaultOptions };
    this.#threshold = threshold;
    this.#duration = duration;
    this.#timeStamp = -Infinity;
  }

  #handleDeviceMotion = (event: DeviceMotionEvent): void => {
    const diff = event.timeStamp - this.#timeStamp;
    const accel = getMaxAcceleration(event);
    if (diff < this.#duration) return;
    if (accel < this.#threshold) return;
    this.#timeStamp = event.timeStamp;
    this.#runListeners(event);
  };

  #runListeners(event: DeviceMotionEvent): void {
    const shakeEvent = createEvent('shake', event);
    this.dispatchEvent(shakeEvent);
    this.#listeners.forEach((listener) => listener(shakeEvent));
  }

  get isDeviceSupported(): boolean {
    return 'DeviceMotionEvent' in window;
  }

  async approve(): Promise<boolean> {
    if (typeof this.#approved !== 'undefined') {
      return this.#approved;
    }

    if (!this.isDeviceSupported) {
      this.#approved = false;
      return false;
    }

    try {
      if (
        'requestPermission' in DeviceMotionEvent &&
        typeof DeviceMotionEvent.requestPermission === 'function'
      ) {
        const permissionState = DeviceMotionEvent.requestPermission();
        this.#approved = permissionState === 'granted';
      } else {
        this.#approved = true;
      }
    } catch {
      this.#approved = false;
    }
    return this.#approved;
  }

  addListener(callback: ShakeEventListener | null): void {
    if (callback) {
      this.#listeners.push(callback);
    }
  }

  removeListener(callback: ShakeEventListener | null): void {
    if (!callback) {
      return;
    }
    const index = this.#listeners.indexOf(callback);
    if (index !== -1) {
      this.#listeners.splice(index, 1);
    }
  }

  async start(): Promise<boolean> {
    const approved = await this.approve();
    if (!approved) {
      return false;
    }
    window.addEventListener('devicemotion', this.#handleDeviceMotion);
    return true;
  }

  stop(): void {
    window.removeEventListener('devicemotion', this.#handleDeviceMotion);
  }
}
