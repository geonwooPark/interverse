import { requestMediaPermissions } from '@utils/requestMediaPermissions'
import React, { useEffect, useState } from 'react'

type PermissionState = 'granted' | 'denied' | 'prompt'

export default function useMediaPermissions() {
  const [permissions, setPermissions] = useState<{
    camera: PermissionState
    microphone: PermissionState
  }>({
    camera: 'prompt',
    microphone: 'prompt',
  })

  useEffect(() => {
    const updatePermissions = async () => {
      try {
        const camera = await navigator.permissions.query({ name: 'camera' })
        const mic = await navigator.permissions.query({ name: 'microphone' })

        setPermissions({
          camera: camera.state,
          microphone: mic.state,
        })

        camera.onchange = () =>
          setPermissions((prev) => ({ ...prev, camera: camera.state }))
        mic.onchange = () =>
          setPermissions((prev) => ({ ...prev, microphone: mic.state }))
      } catch (error) {
        console.log(error)
      }
    }

    updatePermissions()
  }, [])

  useEffect(() => {
    requestMediaPermissions()
  }, [])

  return permissions
}
