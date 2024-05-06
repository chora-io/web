// use substring to consolidate address
export const subAddress = (address: string) =>
  address.substring(0, 12) +
  '...' +
  address.substring(address.length - 6, address.length)
