import { v4 as uuidv4 } from 'uuid';

export interface SavedSimulation {
  id: string;
  type: string;
  initial: number;
  monthly: number;
  rate: number;
  rateType: 'monthly' | 'annual';
  period: number;
  periodType: 'months' | 'years';
  result: {
    total: number;
    totalInvested: number;
    profit: number;
    profitLiquid: number;
  };
  createdAt: string;
}

const STORAGE_KEY = 'rendecerto_simulations';

export function saveSimulation(simulation: Omit<SavedSimulation, 'id' | 'createdAt'>): SavedSimulation {
  const saved: SavedSimulation = {
    ...simulation,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };

  const existing = loadSimulations();
  existing.push(saved);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

  return saved;
}

export function loadSimulations(): SavedSimulation[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteSimulation(id: string): void {
  const existing = loadSimulations();
  const filtered = existing.filter((sim) => sim.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getSimulation(id: string): SavedSimulation | undefined {
  const existing = loadSimulations();
  return existing.find((sim) => sim.id === id);
}

