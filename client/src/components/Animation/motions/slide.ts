export default function slide(props?: { distance?: number; isFade?: boolean }) {
  const distance = props?.distance || 30
  const initOpacity = props?.isFade ? { opacity: 0 } : {}
  const lastOpacity = props?.isFade ? { opacity: 1 } : {}

  return {
    inX: {
      initial: { ...initOpacity, x: distance },
      animate: { ...lastOpacity, x: 0 },
      exit: { ...initOpacity, x: distance },
      transition: { duration: 0.3 },
    },
    inY: {
      initial: { ...initOpacity, y: distance },
      animate: { ...lastOpacity, y: 0 },
      exit: { ...initOpacity, y: distance },
      transition: { duration: 0.3 },
    },
    inOutX: {
      initial: { ...initOpacity, x: distance },
      animate: { ...lastOpacity, y: 0 },
      exit: { ...initOpacity, x: -distance },
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    inOutY: {
      initial: { ...initOpacity, y: distance },
      animate: { ...lastOpacity, y: 0 },
      exit: { ...initOpacity, y: -distance },
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  }
}
