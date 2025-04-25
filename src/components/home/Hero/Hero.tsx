
import { getAllSliders } from "@/app/actions/homeActions";
import Sliders from "./Sliders";



const Hero = async() => {
  const {slider} = await getAllSliders()
  console.log(slider)
  return (
    <div className="mt-5">
      <Sliders slides={slider} />
    </div>
  )
}

export default Hero
