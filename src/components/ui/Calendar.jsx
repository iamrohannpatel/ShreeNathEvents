import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cls = (...classes) => classes.filter(Boolean).join(' ');

function Calendar({ selected, onSelect }) {
  const [month, setMonth] = useState(new Date())
  const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1)
  const endOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const addMonths = (date, m) => new Date(date.getFullYear(), date.getMonth() + m, 1)
  const isSameDay = (a, b) => a && b && a.toDateString() === b.toDateString()

  const grid = () => {
    const start = startOfMonth(month)
    const end = endOfMonth(month)
    const days = []
    const offset = (start.getDay() + 6) % 7
    for (let i = 0; i < offset; i++) days.push(null)
    for (let d = 1; d <= end.getDate(); d++) days.push(new Date(month.getFullYear(), month.getMonth(), d))
    const rows = []
    for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7))
    return rows
  }

  const monthName = month.toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setMonth(addMonths(month, -1))}
          className="p-2 rounded-full hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors"
          aria-label="Prev month"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="font-serif text-lg font-semibold text-gray-900">{monthName}</div>
        <button
          onClick={() => setMonth(addMonths(month, 1))}
          className="p-2 rounded-full hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 text-center mb-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d} className="py-2 text-xs font-bold text-amber-600 uppercase tracking-wider">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid().flat().map((d, i) => (
          <motion.button
            key={i}
            whileHover={d ? { scale: 1.1 } : {}}
            whileTap={d ? { scale: 0.95 } : {}}
            disabled={!d}
            onClick={() => onSelect(d)}
            className={cls(
              'aspect-square rounded-full flex items-center justify-center text-sm transition-all duration-200 relative',
              !d && 'invisible',
              d && !isSameDay(d, selected) && 'text-gray-700 hover:bg-amber-50 hover:text-amber-700',
              isSameDay(d, selected) && 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-200 font-semibold'
            )}
          >
            {d ? d.getDate() : ''}
            {isSameDay(d, selected) && (
              <motion.div
                layoutId="selectedDay"
                className="absolute inset-0 border-2 border-white rounded-full opacity-20"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
