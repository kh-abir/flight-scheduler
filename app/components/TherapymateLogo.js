import { Image } from 'react-native'
const TherapymateLogo = () => {
  return (
    <Image
      style={{
        marginTop: 20,
        marginBottom: 10,
        height: 75,
        width: 200,
      }}
      source={require('../assets/logo-tm.png')}
    />
  )
}

export default TherapymateLogo
