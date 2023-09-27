// get formatted timestamp from timestamp
export const formatTimestamp = (timestamp: any) => {
  const d = new Date(timestamp)
  const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  return `${date} ${d.toLocaleTimeString()}`
}
