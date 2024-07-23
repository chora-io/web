import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ValidatorTableRow.module.css'

const ValidatorTableRow = ({ validator, index }: any) => {
  const { chainInfo } = useContext(WalletContext)

  return (
    <tr key={index} className={validator.jailed ? styles.jailed : undefined}>
      <td>{index + 1}</td>
      <td>{validator.description.moniker}</td>
      <td>{validator.tokens}</td>
      <td>{Number(validator['delegator_shares']).toFixed()}</td>
      <td>
        {Number(validator.commission['commission_rates'].rate).toFixed(2)}
      </td>
      <td>
        {Number(validator.commission['commission_rates']['max_rate']).toFixed(
          2,
        )}
      </td>
      <td>
        {Number(
          validator.commission['commission_rates']['max_change_rate'],
        ).toFixed(2)}
      </td>
      <td>
        <Link
          href={`/${chainInfo.chainId}/validators/${validator['operator_address']}`}
          style={{ textWrap: 'nowrap' }}
        >
          {'more info'}
        </Link>
      </td>
    </tr>
  )
}

export default ValidatorTableRow
