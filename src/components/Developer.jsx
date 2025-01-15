import { useGLTF, useAnimations, useFBX } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes

const Developer = ({ animationName = 'idle', ...props }) => {
    const group = useRef();
    const { nodes, materials } = useGLTF('/models/animations/developer.glb');

    // Load animations
    const { animations: idleAnimation } = useFBX('/models/animations/idle.fbx');
    const { animations: saluteAnimation } = useFBX('/models/animations/salute.fbx');
    const { animations: clappingAnimation } = useFBX('/models/animations/clapping.fbx');
    const { animations: victoryAnimation } = useFBX('/models/animations/victory.fbx');

    // Set animation names
    idleAnimation[0].name = 'idle';
    saluteAnimation[0].name = 'salute';
    clappingAnimation[0].name = 'clapping';
    victoryAnimation[0].name = 'victory';

    const { actions } = useAnimations(
        [...idleAnimation, ...saluteAnimation, ...clappingAnimation, ...victoryAnimation],
        group
    );

    // Play selected animation
    useEffect(() => {
        if (actions) {
            const action = actions[animationName] || actions['idle'];
            if (action) {
                action.reset().fadeIn(0.5).play();
                return () => action.fadeOut(0.5);
            }
        }
    }, [animationName, actions]);

    if (!nodes || !materials) return null; // Prevent rendering if assets are not loaded

    return (
        <group {...props} dispose={null} ref={group}>
            <primitive object={nodes.Hips} />
            {Object.entries(nodes).map(([key, node]) =>
                node.geometry && node.material ? (
                    <skinnedMesh
                        key={key}
                        name={key}
                        geometry={node.geometry}
                        material={materials[node.material.name]}
                        skeleton={node.skeleton}
                        morphTargetDictionary={node.morphTargetDictionary}
                        morphTargetInfluences={node.morphTargetInfluences}
                    />
                ) : null
            )}
        </group>
    );
};

// Prop validation
Developer.propTypes = {
    animationName: PropTypes.oneOf(['idle', 'salute', 'clapping', 'victory']),
};

useGLTF.preload('/models/animations/developer.glb');
export default Developer;
