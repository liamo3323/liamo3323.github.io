// import React, { useState, useEffect } from "react";

import {getPokemonName, fetchPokemonDetails} from '@components/Pk_api'
import Pk_display from '@components/Pk_display'
// import Pk_search from '@components/Pk_search'

export default async function Page() {
  const temp = await fetchPokemonDetails()

  return (
    <div>
      <h1>Team Builder</h1>
      <p>Build your team</p>

      <Pk_display pokemon={temp}/>
      {/* <Pk_search />  */}
    </div>
  )
}