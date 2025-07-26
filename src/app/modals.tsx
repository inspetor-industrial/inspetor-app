import { AddClientModal } from '@ipa/components/modals/add-client-modal'
import { CreateOrganizationModal } from '@ipa/components/modals/create-organization'
import { MyOrganizations } from '@ipa/components/modals/my-organizations'
import { Fragment } from 'react'

export function Modals() {
  return (
    <Fragment>
      <CreateOrganizationModal />
      <MyOrganizations />
      <AddClientModal />
    </Fragment>
  )
}
