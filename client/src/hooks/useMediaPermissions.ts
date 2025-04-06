import React, { useEffect, useState } from 'react'

type PermissionState = 'granted' | 'denied' | 'prompt'

type IParams = {
  fallback?: () => void
}

export default function useMediaPermissions({ fallback }: IParams) {
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
    const requestMediaPermissions = async (): Promise<MediaStream | null> => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })

        stream.getTracks().forEach((track) => track.stop())

        return stream
      } catch (error) {
        fallback && fallback()

        return null
      }
    }

    requestMediaPermissions()
  }, [])

  return permissions
}
