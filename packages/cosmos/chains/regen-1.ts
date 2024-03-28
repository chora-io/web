export const regenMainnet = {
  chainId: 'regen-1',
  chainName: 'Regen',
  rpc: 'https://regen.chora.io/rpc',
  rest: 'https://regen.chora.io/rest',
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'regen',
    bech32PrefixAccPub: 'regenpub',
    bech32PrefixValAddr: 'regenvaloper',
    bech32PrefixValPub: 'regenvaloperpub',
    bech32PrefixConsAddr: 'regenvalcons',
    bech32PrefixConsPub: 'regenvalconspub',
  },
  currencies: [
    {
      coinDenom: 'REGEN',
      coinMinimalDenom: 'uregen',
      coinDecimals: 6,
      coinGeckoId: 'regen',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'REGEN',
      coinMinimalDenom: 'uregen',
      coinDecimals: 6,
      coinGeckoId: 'regen',
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: 'REGEN',
    coinMinimalDenom: 'uregen',
    coinDecimals: 6,
    coinGeckoId: 'regen',
  },
}

export const regenMainnetX = {
  faucet: undefined,
  server: 'https://server.chora.io',
  modules: [
    {
      apiPackage: 'cosmos.authz.v1beta1',
      documentation: 'https://docs.cosmos.network/main/modules/authz',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
      gitVersionLink: 'https://github.com/cosmos/cosmos-sdk/tree/v0.46.13',
    },
    {
      apiPackage: 'cosmos.bank.v1beta1',
      documentation: 'https://docs.cosmos.network/main/modules/bank',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
      gitVersionLink: 'https://github.com/cosmos/cosmos-sdk/tree/v0.46.13',
    },
    {
      apiPackage: 'cosmos.feegrant.v1beta1',
      documentation: 'https://docs.cosmos.network/main/modules/feegrant',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
      gitVersionLink: 'https://github.com/cosmos/cosmos-sdk/tree/v0.46.13',
    },
    {
      apiPackage: 'cosmos.group.v1',
      documentation: 'https://docs.cosmos.network/main/modules/group',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
      gitVersionLink: 'https://github.com/cosmos/cosmos-sdk/tree/v0.46.13',
    },
    {
      apiPackage: 'regen.data.v1',
      documentation: 'https://docs.regen.network/modules/data',
      gitRepository: 'https://github.com/regen-network/regen-ledger',
      gitVersion: 'v5.1.2',
      gitVersionLink:
        'https://github.com/regen-network/regen-ledger/tree/v5.1.2',
    },
    {
      apiPackage: 'regen.ecocredit.v1',
      documentation: 'https://docs.regen.network/modules/ecocredit',
      gitRepository: 'https://github.com/regen-network/regen-ledger',
      gitVersion: 'v5.1.2',
      gitVersionLink:
        'https://github.com/regen-network/regen-ledger/tree/v5.1.2',
    },
    {
      apiPackage: 'regen.intertx.v1',
      documentation: 'https://docs.regen.network/modules/intertx',
      gitRepository: 'https://github.com/regen-network/regen-ledger',
      gitVersion: 'v5.1.2',
      gitVersionLink:
        'https://github.com/regen-network/regen-ledger/tree/v5.1.2',
    },
  ],
}
