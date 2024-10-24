// Ref: https://stackoverflow.com/questions/70544832/detect-shake-event-with-javascript-with-all-major-browsers-devices-ios-androi

export type ShakeEventListener = (event: DeviceMotionEvent) => void;
export type ShakeOptions = {
  threshold: number;
  duration: number;
};

const defaultOptions: ShakeOptions = { threshold: 10, duration: 250 };

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
  #threshold: ShakeOptions['threshold'];
  #duration: ShakeOptions['duration'];
  #approved?: boolean;
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
    this.#listeners.forEach((listener) => listener(event));
  }

  get isDeviceSupported(): boolean {
    return 'DeviceMotionEvent' in window;
  }

  get isPermissionRequired(): boolean {
    return this.isDeviceSupported && 'requestPermission' in DeviceMotionEvent;
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
        const permissionState = await DeviceMotionEvent.requestPermission();
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
