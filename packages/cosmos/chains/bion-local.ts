export const bionLocal = {
  chainId: 'bion-local',
  chainName: 'Bion Local',
  rpc: 'http://127.0.0.1:26657',
  rest: 'http://127.0.0.1:1317',
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'bion',
    bech32PrefixAccPub: 'bionpub',
    bech32PrefixValAddr: 'bionvaloper',
    bech32PrefixValPub: 'bionvaloperpub',
    bech32PrefixConsAddr: 'bionvalcons',
    bech32PrefixConsPub: 'bionvalconspub',
  },
  currencies: [
    {
      coinDenom: 'STAKE',
      coinMinimalDenom: 'stake',
      coinDecimals: 6,
      coinGeckoId: 'stake',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'STAKE',
      coinMinimalDenom: 'stake',
      coinDecimals: 6,
      coinGeckoId: 'stake',
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: 'STAKE',
    coinMinimalDenom: 'stake',
    coinDecimals: 6,
    coinGeckoId: 'stake',
  },
}

export const bionLocalX = {
  coopId: '1',
  faucet: 'http://127.0.0.1:8000',
  server: 'http://127.0.0.1:3000',
  modules: [
    {
      moduleName: 'group',
      documentation: 'https://docs.cosmos.network/main/modules/group',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
      gitVersionLink: 'https://github.com/cosmos/cosmos-sdk/tree/v0.46.13',
    },
    {
      moduleName: 'validator',
      documentation: 'https://docs.chora.io/specs/validator',
      gitRepository: 'https://github.com/chora-io/mods',
      gitVersion: 'v0.0.0',
      gitVersionLink: 'https://github.com/chora-io/mods/main',
    },
  ],
}
