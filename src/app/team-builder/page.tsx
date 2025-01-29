import {getPokemonName} from '@components/Pk_api'
import Pk_display from '@components/Pk_display'
import Pk_search from '@components/Pk_search'

export default async function Page() {
  const posts = await getPokemonName()
  return (
    <div>
      <h1>Team Builder</h1>
      <p>Build your team</p>

      <Pk_display />
      <Pk_search />
    </div>
  )
}
