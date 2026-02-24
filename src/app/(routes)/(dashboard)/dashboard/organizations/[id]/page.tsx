import OrganizationDetails from "./OrganizationDetails"

interface Props {
  params: Promise<{ id: string }>
}

const OrganizationDetailsPage = async ({ params }: Props) => {
  const { id } = await params
  return <OrganizationDetails organizationId={id} />
}

export default OrganizationDetailsPage
