import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

export default function HollowKnightScene({ scrollProgress }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/hollow_knight/scene.gltf')
  const { actions, mixer } = useAnimations(animations, group)
  const [currentAction, setCurrentAction] = useState(null)

  // 애니메이션 디버깅 - 어떤 애니메이션이 있는지 확인
  useEffect(() => {
    if (actions) {
      console.log('Available animations:', Object.keys(actions))
    }
  }, [actions])

  // 스크롤에 따라 모델 회전 및 위치 변경
  useFrame(() => {
    if (group.current) {
      // 스크롤에 따라 Y축 회전 (360도 회전)
      group.current.rotation.y = scrollProgress * Math.PI * 2

      // 스크롤에 따라 위치 변화 - 수정: 초기 위치를 0으로 낮춤
      group.current.position.y = -0.5 - scrollProgress * 2

      // 스크롤에 따라 좌우로 약간 이동
      group.current.position.x = Math.sin(scrollProgress * Math.PI * 2) * 1.5
    }
  })

  // 스크롤에 따른 애니메이션 전환
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return

    const actionNames = Object.keys(actions)

    // 스크롤 진행도에 따라 다른 애니메이션 재생
    if (scrollProgress < 0.2) {
      // Idle 애니메이션 (처음)
      const idleAction = actions[actionNames.find(name =>
        name.toLowerCase().includes('idle') ||
        name.toLowerCase().includes('stand')
      )] || actions[actionNames[0]]

      if (idleAction && currentAction !== idleAction) {
        Object.values(actions).forEach(action => action.stop())
        idleAction.reset().fadeIn(0.5).play()
        setCurrentAction(idleAction)
      }
    } else if (scrollProgress >= 0.3 && scrollProgress < 0.7) {
      // Attack 애니메이션 (중간 - 검 휘두르기)
      const attackAction = actions[actionNames.find(name =>
        name.toLowerCase().includes('attack') ||
        name.toLowerCase().includes('swing') ||
        name.toLowerCase().includes('hit')
      )] || actions[actionNames[1]]

      if (attackAction && currentAction !== attackAction) {
        Object.values(actions).forEach(action => action.stop())
        attackAction.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.3).play()
        attackAction.timeScale = 0.5 // 애니메이션 속도를 절반으로 줄임
        setCurrentAction(attackAction)
      }
    } else if (scrollProgress >= 0.7) {
      // Walk/Run 애니메이션 (끝)
      const walkAction = actions[actionNames.find(name =>
        name.toLowerCase().includes('walk') ||
        name.toLowerCase().includes('run')
      )] || actions[actionNames[2]] || actions[actionNames[0]]

      if (walkAction && currentAction !== walkAction) {
        Object.values(actions).forEach(action => action.stop())
        walkAction.reset().fadeIn(0.5).play()
        setCurrentAction(walkAction)
      }
    }
  }, [scrollProgress, actions, currentAction])

  return (
    <group ref={group}>
      <primitive object={scene} scale={0.7} />
    </group>
  )
}

useGLTF.preload('/hollow_knight/scene.gltf')
