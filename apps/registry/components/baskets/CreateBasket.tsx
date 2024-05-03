'use client'

import { MsgCreate as Msg } from 'cosmos/api/regen/ecocredit/basket/v1/tx'
import { Permissions, ResultTx } from 'chora/components'
import { InputString } from 'chora/components/forms'
import { SelectCreditType } from 'chora/components/forms/regen.ecocredit.v1'
import { InputCreditClasses } from 'chora/components/forms/regen.ecocredit.basket.v1'
import { WalletContext } from 'chora/contexts'
import { useBasketFee, useCreditTypes } from 'chora/hooks'
import { signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

import { useClassesByType } from '@hooks/useClassesByType'
import { usePermissions } from '@hooks/usePermissions'

import styles from './CreateBasket.module.css'

const CreateBasket = () => {
  const { chainInfo, wallet } = useContext(WalletContext)

  const [basketFee, basketFeeError] = useBasketFee(chainInfo)
  const [creditTypes, creditTypesError] = useCreditTypes(chainInfo)

  const [isAuthz, permError] = usePermissions(
    wallet,
    '/regen.ecocredit.basket.v1.MsgCreateBasket',
  )

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [creditTypeAbbrev, setCreditTypeAbbrev] = useState<string>('')
  const [allowedClass, setAllowedClass] = useState<string[]>([])

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  // NOTE: must come after credit type form input state is declared
  const [classes, classesError] = useClassesByType(chainInfo, creditTypeAbbrev)

  // error fetching initial parameters
  const initError =
    basketFeeError || creditTypesError || permError || classesError

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    const msg = {
      curator: wallet.bech32Address,
      name: name,
      description: description,
      creditTypeAbbrev: creditTypeAbbrev,
      allowedClasses: allowedClass.map((c: any) => c.id),
      fee: [{ denom: basketFee.denom, amount: basketFee.amount }],
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.ecocredit.basket.v1.MsgCreate',
      value: Msg.encode(msg).finish(),
    }

    await signAndBroadcast(chainInfo, wallet.bech32Address, [msgAny])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div id="msg-create-basket" className={styles.box}>
      <Permissions
        permissions={[
          {
            label: 'new curator',
            hasPermission: true,
          },
          {
            label: 'authz grantee',
            hasPermission: isAuthz,
          },
        ]}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="msg-create-name"
          label="basket name"
          placeholder="NCT"
          string={name}
          setString={setName}
        />
        <InputString
          id="msg-create-description"
          label="basket description"
          placeholder="Nature Carbon Ton"
          string={description}
          setString={setDescription}
        />
        <hr />
        <SelectCreditType
          id="msg-create-credit-type"
          label="credit type"
          options={creditTypes}
          selected={creditTypeAbbrev}
          setSelected={setCreditTypeAbbrev}
        />
        <InputCreditClasses
          id="msg-create-allowed-classes"
          options={classes ? classes : []}
          classes={allowedClass}
          setClasses={setAllowedClass}
        />
        <hr />
        <InputString
          id="msg-create-basket-fee-denom"
          label="fee denom"
          disabled={true}
          placeholder="uregen"
          string={basketFee?.denom || ''}
        />
        <InputString
          id="msg-create-basket-fee-amount"
          label="fee amount"
          disabled={true}
          placeholder="20000000"
          string={basketFee?.amount || ''}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx
        error={error || initError}
        rest={chainInfo?.rest}
        success={success}
      />
    </div>
  )
}

export default CreateBasket
