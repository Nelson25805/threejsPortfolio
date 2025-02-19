/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: J. Beltran (https://sketchfab.com/ilchampo)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/gameboy-challenge-pokemon-edition-4bce6a789cd74416a2ef2236ea8c9fde
Title: Gameboy Challenge - Pokemon Edition
*/

import { useGLTF } from '@react-three/drei'

const PikachuGameboy = (props) => {
  const { nodes, materials } = useGLTF('/models/pikachu-gameboy.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.shader}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/pikachu-gameboy.glb')

export default PikachuGameboy