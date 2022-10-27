import { networkInterfaces } from 'os'

const nets = networkInterfaces()
const networks = Object.create(null)

export const getNetworksData = () => {
  for (const name of Object.keys(nets)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const net of nets[name]!) {
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
      if (net.family === familyV4Value && !net.internal) {
        if (!networks[name]) {
          networks[name] = []
        }
        networks[name].push(net.address)
      }
    }
  }
  return networks
}
