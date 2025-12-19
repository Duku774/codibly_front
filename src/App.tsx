import EnergyMix from './EnergyMix'
import RenderOptimalCharge from './OptimalCharge'

function App() {
  return (
    <div style={{display: "flex", flexDirection: "column", position: "absolute", top: "0px", left: "0px"}}>
      <div style={{height: "5vh", width: "100vw", backgroundColor: "lightgrey", color: "black", fontSize: "x-large", textAlign: "center", fontWeight: "700"}}>Carbon Intensity UI</div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <EnergyMix/>
        <RenderOptimalCharge/>
      </div>
    </div>
  )
}

export default App
