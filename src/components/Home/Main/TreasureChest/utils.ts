export const generateRandomShakeVariants = (
  boundary: number,
  delta: number,
): number[] => {
  const randomBoundary = (value: number) =>
    value + (Math.random() * delta * 2 - delta);
  return [randomBoundary(-boundary), randomBoundary(boundary), 0];
};

export const generateRandomDelay = () => -(Math.random() * 0.5 + 0.05);
export const generateRandomDuration = () => Math.random() * 0.05 + 0.2;
