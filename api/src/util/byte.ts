const byteFactors = { TB: 4, GB: 3, MB: 2, KB: 1 };

type BytesMatch = [string, string, string] | null;
export const stringToBytes = (
  value: string | undefined,
): number | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }
  const match = value.match(/([0-9\.]+)([A-Za-z]+)/) as BytesMatch;
  if (!match) {
    throw new Error(`Invalid byte string: "${value}", expected e.g. "10GB"`);
  }
  const count = Number.parseFloat(match[1]);
  const units = match[2].toUpperCase();
  if (!(units in byteFactors)) {
    throw new Error(
      `Invalid byte string: "${value}", invalid units "${units}"`,
    );
  }
  const factor = byteFactors[units as keyof typeof byteFactors];
  return count * 1024 ** factor;
};
