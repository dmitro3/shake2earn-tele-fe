// Ref: https://stackoverflow.com/questions/70544832/detect-shake-event-with-javascript-with-all-major-browsers-devices-ios-androi

export type DeviceMotionEventListener = (event: DeviceMotionEvent) => void;
export type DeviceMotionOptions = {
  threshold: number;
  duration: number;
};

export type deviceMotionApprovalStatus =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

const defaultOptions: DeviceMotionOptions = { threshold: 10, duration: 250 };

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

export class DeviceMotion extends EventTarget {
  #threshold: DeviceMotionOptions['threshold'];
  #duration: DeviceMotionOptions['duration'];
  #approved?: deviceMotionApprovalStatus;
  #timeStamp: number;
  #listeners: DeviceMotionEventListener[] = [];
  // Debug
  #debugListeners: DeviceMotionEventListener[] = [];

  constructor(options?: Partial<DeviceMotionOptions>) {
    super();
    const { threshold, duration } = { ...options, ...defaultOptions };
    this.#threshold = threshold;
    this.#duration = duration;
    this.#timeStamp = -Infinity;
  }

  static get isDeviceSupported(): boolean {
    return 'DeviceMotionEvent' in window;
  }

  static get isPermissionRequired(): boolean {
    return this.isDeviceSupported && 'requestPermission' in DeviceMotionEvent;
  }

  static async approve(): Promise<deviceMotionApprovalStatus> {
    if (!this.isDeviceSupported) {
      return {
        success: false,
        error: 'Device not supported.',
      };
    }

    try {
      if (
        'requestPermission' in DeviceMotionEvent &&
        typeof DeviceMotionEvent.requestPermission === 'function'
      ) {
        const permissionState = await DeviceMotionEvent.requestPermission();
        if (permissionState === 'granted') {
          return { success: true };
        } else {
          return {
            success: false,
            error: 'Motion permission required.',
          };
        }
      } else {
        return { success: true };
      }
    } catch {
      return {
        success: false,
        error: 'An error occurred while requesting motion permission.',
      };
    }
  }

  #handleDeviceMotion = (event: DeviceMotionEvent): void => {
    const diff = event.timeStamp - this.#timeStamp;
    const accel = getMaxAcceleration(event);
    this.#debugListeners.forEach((listener) =>
      listener({
        ...event,
        duration: diff < this.#duration,
        accel: accel < this.#threshold,
      } as any),
    );
    if (diff < this.#duration) return;
    if (accel < this.#threshold) return;
    this.#timeStamp = event.timeStamp;
    this.#runListeners(event);
  };

  #runListeners(event: DeviceMotionEvent): void {
    this.#listeners.forEach((listener) => listener(event));
  }

  addListener(callback: DeviceMotionEventListener | null): void {
    if (callback) {
      this.#listeners.push(callback);
    }
  }

  removeListener(callback: DeviceMotionEventListener | null): void {
    if (!callback) {
      return;
    }
    const index = this.#listeners.indexOf(callback);
    if (index !== -1) {
      this.#listeners.splice(index, 1);
    }
  }

  async start(): Promise<boolean> {
    this.#approved = await (this.#approved ?? DeviceMotion.approve());
    if (!this.#approved.success) {
      return false;
    }
    window.addEventListener('devicemotion', this.#handleDeviceMotion);
    return true;
  }

  stop(): void {
    window.removeEventListener('devicemotion', this.#handleDeviceMotion);
  }

  addDebugListener(callback: DeviceMotionEventListener | null): void {
    if (callback) {
      this.#debugListeners.push(callback);
    }
  }

  removeDebugListener(callback: DeviceMotionEventListener | null): void {
    if (!callback) {
      return;
    }
    const index = this.#debugListeners.indexOf(callback);
    if (index !== -1) {
      this.#debugListeners.splice(index, 1);
    }
  }
}
