import { GroupContextProvider } from '@contexts/GroupContext'

const Layout = ({ children }: any) => (
  <GroupContextProvider>{children}</GroupContextProvider>
)

export default Layout
