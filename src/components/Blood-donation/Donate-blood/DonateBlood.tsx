import DonorCard from "./DonorCard"

const DonateBlood = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <DonorCard />
      <DonorCard />
      <DonorCard />
    </div>
  )
}

export default DonateBlood
