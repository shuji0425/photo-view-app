export const photoSlideVariants = {
  enter: (dir: string) => ({
    x: dir === "left" ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: string) => ({
    x: dir === "left" ? -300 : 300,
    opacity: 0,
    scale: 0.9,
  }),
};

export const photoSlideTransition = {
  type: "spring",
  stiffness: 250,
  damping: 20,
  mass: 0.9,
  restDelta: 0.001,
};
