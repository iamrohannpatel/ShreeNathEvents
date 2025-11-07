
import React, { useState } from 'react';

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
            <div className="min-h-screen bg-white">
              <div className="flex items-center justify-between">
                <button onClick={() => setMonth(addMonths(month, -1))} className="p-2 rounded hover:bg-gray-50" aria-label="Prev month"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                <div className="font-medium">{monthName}</div>
                <button onClick={() => setMonth(addMonths(month, 1))} className="p-2 rounded hover:bg-gray-50" aria-label="Next month"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
              </div>
              <div className="mt-3 grid grid-cols-7 text-center text-xs text-gray-500">
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (<div key={d} className="py-1">{d}</div>))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-sm">
                {grid().flat().map((d, i) => (
                  <button key={i} disabled={!d} onClick={() => onSelect(d)} className={cls('aspect-square rounded-md flex items-center justify-center', !d && 'opacity-0', d && 'hover:bg-gray-50', isSameDay(d, selected) && 'ring-2 ring-gold')}>{d ? d.getDate() : ''}</button>
                ))}
              </div>
            </div>
    );
  }

  export default Calendar;
