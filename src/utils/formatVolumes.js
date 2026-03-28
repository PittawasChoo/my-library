export function formatVolumes(volumes) {
  if (!volumes || volumes.length === 0) return ''

  // convert to number + sort
  const nums = volumes
    .map(Number)
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b)

  const ranges = []
  let start = nums[0]
  let end = nums[0]

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === end + 1) {
      end = nums[i]
    } else {
      ranges.push(start === end ? `${start}` : `${start}-${end}`)
      start = nums[i]
      end = nums[i]
    }
  }

  // push last range
  ranges.push(start === end ? `${start}` : `${start}-${end}`)

  return ranges.join(', ')
}
