'use client'

import MonitorsListItem from '@components/monitors/MonitorsListItem'

const MonitorsList = ({ monitors }: any) => {
  return (
    <>
      {monitors &&
        monitors.map((monitor: any) => (
          <MonitorsListItem key={monitor.id} monitor={monitor} />
        ))}
    </>
  )
}

export default MonitorsList
