import { FishSymbol as Futbol, Users, Dumbbell } from 'lucide-react';

interface SportData {
  id: string;
  name: string;
  icon: React.ComponentType<{ size: number }>;
  color: string;
  description: string;
  benefits: string[];
}

export const sportsData: SportData[] = [
  {
    id: 'football',
    name: 'Football',
    icon: Futbol,
    color: 'text-blue-500',
    description: 'Focus on cardio, agility, and team coordination.',
    benefits: ['Cardiovascular health', 'Lower body strength', 'Motor coordination']
  },
  {
    id: 'mma',
    name: 'MMA',
    icon: Users,
    color: 'text-red-500',
    description: 'Complete body conditioning and combat skills.',
    benefits: ['Full body strength', 'Mental resilience', 'Combat techniques']
  },
  {
    id: 'bodybuilding',
    name: 'Bodybuilding',
    icon: Dumbbell,
    color: 'text-purple-500',
    description: 'Muscle development and aesthetic physique.',
    benefits: ['Muscle hypertrophy', 'Body composition', 'Strength gains']
  }
];