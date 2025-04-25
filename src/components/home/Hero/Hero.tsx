
import { getAllSliders } from "@/app/actions/homeActions";
import Sliders from "./Sliders";


const Hero = async() => {
  const {slider} = await getAllSliders()
  return (
    <div className="mt-5">
      <Sliders slides={slider} />
    </div>
  )
}

export default Hero
