'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { InvestmentType } from '@/lib/investments';

interface InvestmentCardProps {
  investment: InvestmentType;
}

export default function InvestmentCard({ investment }: InvestmentCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{investment.icon}</div>
        <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded">
          {investment.irType === 'isento' ? 'Isento de IR' : 'IR Regressivo'}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {investment.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {investment.description}
      </p>

      <Link
        href={`/simulador?type=${investment.id}`}
        className="btn-primary w-full text-center block"
      >
        Simular Agora
      </Link>
    </motion.div>
  );
}

