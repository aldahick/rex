const byteFactors = { TB: 4, GB: 3, MB: 2, KB: 1 };

export const stringToBytes = (
  value: string | undefined,
): number | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }
  const match = value.match(/([0-9\.]+)([A-z]+)/);
  if (!match) {
    throw new Error(`Invalid byte string: "${value}", expected e.g. "10GB"`);
  }
  const count = Number(match[1]);
  const units = match[2]?.toUpperCase();
  if (!units) {
    throw new Error(`Invalid byte string: "${value}", no units found`);
  }
  if (!(units in byteFactors)) {
    throw new Error(`Invalid byte string: "${value}"`);
  }
  const factor = byteFactors[units as keyof typeof byteFactors];
  return count * 1024 ** factor;
};
