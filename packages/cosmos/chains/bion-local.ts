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
      coinDenom: 'BION',
      coinMinimalDenom: 'ubion',
      coinDecimals: 6,
      coinGeckoId: 'bion',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'BION',
      coinMinimalDenom: 'ubion',
      coinDecimals: 6,
      coinGeckoId: 'bion',
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: 'BION',
    coinMinimalDenom: 'ubion',
    coinDecimals: 6,
    coinGeckoId: 'bion',
  },
}

export const bionLocalX = {
  faucet: 'http://127.0.0.1:8000',
  server: 'http://127.0.0.1:3000',
  modules: [
    {
      apiPackage: 'chora.validator.v1',
      documentation: 'https://docs.chora.io/specs/validator',
      gitRepository: 'https://github.com/chora-io/mods',
      gitVersion: 'validator/v0.0.0',
    },
  ],
}
