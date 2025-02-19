//
// Algorithms
//
export interface AlgorithmConfig {
  title: string;
  img: string;
  path: string;
  alt: string;
}

export type Algorithm = 'sorting' | 'pathfinding' | 'hanoi';

export const algorithms: Record<Algorithm, AlgorithmConfig> = {
  sorting: {
    title: 'Sorting Algorithms',
    img: './sorting.png',
    path: '/sorting',
    alt: 'Sorting Logo'
  },
  pathfinding: {
    title: 'Pathfinding Algorithms',
    img: './pathfinding.png',
    path: '/pathfinding',
    alt: 'Pathfinding Logo'
  },
  hanoi: {
    title: 'Tower of Hanoi',
    img: './hanoi.png',
    path: '/hanoi',
    alt: 'Hanoi Logo'
  }
};

export const routes = Object.values(algorithms).map((a) => ({
  title: a.title,
  img: a.img,
  path: a.path
}));

//
// Link
//
export const links = {
  github: 'https://github.com/victormhp/code-craft',
  linkedin: 'https://www.linkedin.com/in/victormhp'
};
