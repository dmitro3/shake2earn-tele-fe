export type RewardConfig<T extends string, V> = {
  type: T;
  probability: number;
  value?: V;
  getValue?: () => V;
};

export function getRandomReward<T extends string, V>(
  rewards: RewardConfig<T, V>[],
): { type: T; value: V } {
  const totalProbability = rewards.reduce(
    (total, ele) => total + ele.probability,
    0,
  );
  const randomValue = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (const reward of rewards) {
    cumulativeProbability += reward.probability;
    if (randomValue < cumulativeProbability) {
      const value = (reward.getValue ? reward.getValue() : reward.value) as V;
      return { type: reward.type, value };
    }
  }

  const firstReward = rewards[0];
  const value = (
    firstReward.getValue ? firstReward.getValue() : firstReward.value
  ) as V;
  return { type: firstReward.type, value };
}
