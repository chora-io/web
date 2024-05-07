export const choraTestnet = {
  chainId: 'chora-testnet-1',
  chainName: 'Chora Testnet',
  rpc: 'https://testnet.chora.io/rpc',
  rest: 'https://testnet.chora.io/rest',
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'chora',
    bech32PrefixAccPub: 'chorapub',
    bech32PrefixValAddr: 'choravaloper',
    bech32PrefixValPub: 'choravaloperpub',
    bech32PrefixConsAddr: 'choravalcons',
    bech32PrefixConsPub: 'choravalconspub',
  },
  currencies: [
    {
      coinDenom: 'CHORA',
      coinMinimalDenom: 'uchora',
      coinDecimals: 6,
      coinGeckoId: 'chora',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'CHORA',
      coinMinimalDenom: 'uchora',
      coinDecimals: 6,
      coinGeckoId: 'chora',
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: 'CHORA',
    coinMinimalDenom: 'uchora',
    coinDecimals: 6,
    coinGeckoId: 'chora',
  },
}

export const choraTestnetX = {
  faucet: 'https://testnet.chora.io/faucet/',
  server: 'https://api.chora.io',
  modules: [
    {
      apiPackage: 'chora.content.v1',
      documentation: 'https://docs.chora.io/specs/content',
      gitRepository: 'https://github.com/chora-io/mods',
      gitVersion: 'content/v0.0.0',
    },
    {
      apiPackage: 'chora.geonode.v1',
      documentation: 'https://docs.chora.io/specs/geonode',
      gitRepository: 'https://github.com/chora-io/mods',
      gitVersion: 'geonode/v0.0.0',
    },
    {
      apiPackage: 'chora.voucher.v1',
      documentation: 'https://docs.chora.io/specs/voucher',
      gitRepository: 'https://github.com/chora-io/mods',
      gitVersion: 'voucher/v0.0.0',
    },
    {
      apiPackage: 'cosmos.auth.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/auth',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.authz.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/authz',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.bank.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/bank',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.crisis.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/crisis',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.distribution.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/distribution',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.evidence.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/evidence',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.feegrant.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/feegrant',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.gov.v1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/gov',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.gov.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/gov',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.group.v1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/group',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.mint.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/mint',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.params.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/params',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.slashing.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/slashing',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.staking.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/staking',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'cosmos.upgrade.v1beta1',
      documentation: 'https://docs.cosmos.network/v0.46/modules/upgrade',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
    },
    {
      apiPackage: 'regen.data.v1',
      documentation: 'https://docs.regen.network/modules/data',
      gitRepository: 'https://github.com/regen-network/regen-ledger',
      gitVersion: 'x/data/v2.3.1',
    },
    {
      apiPackage: 'regen.intertx.v1',
      documentation: 'https://docs.regen.network/modules/intertx',
      gitRepository: 'https://github.com/regen-network/regen-ledger',
      gitVersion: 'x/intertx/v1.3.1',
    },
  ],
}
