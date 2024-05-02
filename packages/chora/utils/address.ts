// use substring to consolidate address
export const subAddress = (address: string) =>
  address.substring(0, 10) +
  '...' +
  address.substring(address.length - 4, address.length)
