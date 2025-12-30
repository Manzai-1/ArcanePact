const SEPOLIA_BLOCK_TIME_SECONDS = 12n

export function blockToDate(
  targetBlock: bigint | undefined,
  currentBlock: bigint | undefined,
): string {
  if (targetBlock == null || currentBlock == null) return 'N/A'

  const blockDiff =
    targetBlock >= currentBlock
      ? targetBlock - currentBlock
      : currentBlock - targetBlock

  const secondsDiff = blockDiff * SEPOLIA_BLOCK_TIME_SECONDS
  const msDiff = Number(secondsDiff) * 1000

  const date =
    targetBlock >= currentBlock
      ? new Date(Date.now() + msDiff)
      : new Date(Date.now() - msDiff)

  return date.toLocaleString('sv-SE');
}