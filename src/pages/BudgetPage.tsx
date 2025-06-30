import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { Expense, Income } from '../types';
import { Plus } from 'lucide-react';

const BudgetPage: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [newIncomeTitle, setNewIncomeTitle] = useState('');
  const [newIncomeAmount, setNewIncomeAmount] = useState<number | ''>('');

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState<number | ''>('');

  const [showNewIncomeInput, setShowNewIncomeInput] = useState(false);
  const [showNewExpenseInput, setShowNewExpenseInput] = useState(false);

  const [sortField, setSortField] = useState<'category' | 'title' | 'amount'>('category');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = totalIncome - totalExpenses;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await API.get('/api/incomes');
        setIncomes(incomeRes.data);
        const expenseRes = await API.get('/api/budgets');
        setExpenses(expenseRes.data);
      } catch (err: any) {
        console.error('Failed to fetch data:', err.response?.data || err.message);
      }
    };
    fetchData();
  }, []);

  const addIncome = async () => {
    if (!newIncomeTitle.trim() || newIncomeAmount === '') return;

    try {
      const { data } = await API.post('/api/incomes', {
        title: newIncomeTitle.trim(),
        amount: Number(newIncomeAmount),
      });
      setIncomes([...incomes, data]);
      setNewIncomeTitle('');
      setNewIncomeAmount('');
      setShowNewIncomeInput(false);
    } catch (err: any) {
      console.error('Failed to add income:', err.response?.data || err.message);
    }
  };

  const toggleLockIncome = async (id: string) => {
    const income = incomes.find((i) => i._id === id);
    if (!income) return;

    try {
      const { data } = await API.put(`/api/incomes/${id}`, {
        locked: !income.locked,
      });
      setIncomes(incomes.map((i) => (i._id === id ? data : i)));
    } catch (err: any) {
      console.error('Failed to toggle lock:', err.response?.data || err.message);
    }
  };

  const editIncomeAmount = async (id: string, amount: number) => {
    try {
      const { data } = await API.put(`/api/incomes/${id}`, { amount });
      setIncomes(incomes.map((i) => (i._id === id ? data : i)));
    } catch (err: any) {
      console.error('Failed to update amount:', err.response?.data || err.message);
    }
  };

  const addExpense = async () => {
    if (!newTitle.trim() || !newCategory.trim() || newAmount === '') return;

    try {
      const { data } = await API.post('/api/budgets', {
        title: newTitle.trim(),
        amount: Number(newAmount),
        category: newCategory.trim(),
      });
      setExpenses([...expenses, data]);
      setNewTitle('');
      setNewAmount('');
      setNewCategory('');
      setShowNewExpenseInput(false);
    } catch (err: any) {
      console.error('Failed to add expense:', err.response?.data || err.message);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await API.delete(`/api/budgets/${id}`);
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err: any) {
      console.error('Failed to delete expense:', err.response?.data || err.message);
    }
  };

  const handleSort = (field: 'category' | 'title' | 'amount') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    let compare = 0;
    if (sortField === 'amount') {
      compare = a.amount - b.amount;
    } else {
      compare = a[sortField].localeCompare(b[sortField]);
    }
    return sortDirection === 'asc' ? compare : -compare;
  });

  return (
    <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-60 py-5">
      <h1 className="text-base mb-2 text-center">Family Budget</h1>

      {/* Income Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold">Incomes</h2>
          <button
            onClick={() => setShowNewIncomeInput(!showNewIncomeInput)}
            className="text-green-600 shadow-md p-1 rounded-full hover:bg-green-100 transition-transform transform hover:scale-110"
          >
            <Plus size={14} />
          </button>
        </div>

        {showNewIncomeInput && (
          <div className="flex flex-col space-y-2 mb-2">
            <input
              type="text"
              value={newIncomeTitle}
              onChange={(e) => setNewIncomeTitle(e.target.value)}
              placeholder="Income title"
              className="text-xs border rounded px-2 py-1"
            />
            <input
              type="number"
              value={newIncomeAmount}
              onChange={(e) => setNewIncomeAmount(Number(e.target.value))}
              placeholder="Amount"
              className="text-xs border rounded px-2 py-1"
            />
            <button
              onClick={addIncome}
              className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700"
            >
              Add Income
            </button>
          </div>
        )}

        {incomes.map((inc) => (
          <div key={inc._id} className="flex items-center justify-between mb-1 border-b pb-1">
            <div>
              <p className="text-xs font-semibold">{inc.title}</p>
              {inc.locked ? (
                <p className="text-xs">${inc.amount.toFixed(2)}</p>
              ) : (
                <input
                  type="number"
                  value={inc.amount}
                  onChange={(e) => editIncomeAmount(inc._id, Number(e.target.value))}
                  className="text-xs border rounded px-2 py-1"
                />
              )}
            </div>
            <button
              onClick={() => toggleLockIncome(inc._id)}
              className="text-[10px] px-2 py-1 rounded bg-gray-300 hover:bg-gray-400"
            >
              {inc.locked ? 'Unlock' : 'Lock'}
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mb-6 text-xs">
        <p>Total Income: ${totalIncome.toFixed(2)}</p>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p className={`${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
          Remaining: ${remaining.toFixed(2)}
        </p>
      </div>

      {/* Expenses Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold">Expenses</h2>
          <button
            onClick={() => setShowNewExpenseInput(!showNewExpenseInput)}
            className="text-red-600 shadow-md p-1 rounded-full hover:bg-red-100 transition-transform transform hover:scale-110"
          >
            <Plus size={14} />
          </button>
        </div>

        {showNewExpenseInput && (
          <div className="flex flex-col space-y-2 mb-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category"
              className="text-xs border rounded px-2 py-1"
            />
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
              className="text-xs border rounded px-2 py-1"
            />
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(Number(e.target.value))}
              placeholder="Amount"
              className="text-xs border rounded px-2 py-1"
            />
            <button
              onClick={addExpense}
              className="bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700"
            >
              Add Expense
            </button>
          </div>
        )}

        {/* Expenses Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border text-left text-xs">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 border cursor-pointer" onClick={() => handleSort('category')}>
                  Category {sortField === 'category' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="px-2 py-1 border cursor-pointer" onClick={() => handleSort('title')}>
                  Title {sortField === 'title' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="px-2 py-1 border cursor-pointer" onClick={() => handleSort('amount')}>
                  Amount {sortField === 'amount' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="px-2 py-1 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map((exp) => (
                <tr key={exp._id} className="hover:bg-gray-50">
                  <td className="px-2 py-1 border">{exp.category}</td>
                  <td className="px-2 py-1 border">{exp.title}</td>
                  <td className="px-2 py-1 border">${exp.amount.toFixed(2)}</td>
                  <td className="px-2 py-1 border">
                    <button
                      onClick={() => deleteExpense(exp._id)}
                      className="text-red-600 hover:text-red-800 text-[10px]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {sortedExpenses.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-2 text-gray-500 text-[10px]">
                    No expenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
