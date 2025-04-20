export default function scale(props?: { scale?: number }) {
  const scale = props?.scale || 0.8

  return {
    in: {
      initial: { scale },
      animate: { scale: 1 },
      exit: { scale },
      transition: { duration: 0.2 },
    },
    out: {
      initial: { scale: 1 },
      animate: { scale },
      exit: { scale: 1 },
      transition: { duration: 0.2 },
    },
  }
}
