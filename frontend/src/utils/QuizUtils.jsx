
export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  export const getMotivation = (score, total) => {
    const percent = (score / total) * 100;
    if (percent >= 80) return '🔥 You’re a star!';
    if (percent >= 50) return '👏 Good job! Keep going.';
    return '💪 Don’t give up! Practice makes perfect.';
  };