import styles from './Validator.module.css'

const Validators = ({ validator, index }: any) => (
  <tr key={index} className={validator['jailed'] ? styles.jailed : undefined}>
    <td>{validator.description['moniker']}</td>
    <td>{validator['tokens']}</td>
    <td>{Number(validator['delegator_shares']).toFixed()}</td>
    <td>
      {Number(validator['commission']['commission_rates']['rate']).toFixed(2)}
    </td>
    <td>
      {Number(validator['commission']['commission_rates']['max_rate']).toFixed(
        2,
      )}
    </td>
    <td>
      {Number(
        validator['commission']['commission_rates']['max_change_rate'],
      ).toFixed(2)}
    </td>
  </tr>
)

export default Validators
