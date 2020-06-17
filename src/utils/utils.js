import statesAndProvinces from "../assets/statesAndProvinces.json"

/////////////////////////////////////////////////////////////
export function formatStationsToDisplayOnDropdownMenu(allStations) {
  let stations = [...allStations]
  let res = []

  statesAndProvinces
    .filter(s => s.isNewaStatePartner)
    .forEach(state => {
      let p = {}
      p.label = state.name
      p.postalCode = state.postalCode
      p.options = stations
        .filter(stn => stn.state === state.postalCode)
        .map(stn => {
          const rest = {
            ...stn,
            label: `${stn.name}, ${stn.state}`,
            stateFullName: state.name,
          }
          return rest
        })
      res.push(p)
    })
  return res.filter(s => s.options.length !== 0)
}
