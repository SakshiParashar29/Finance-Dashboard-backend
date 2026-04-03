const Transaction = require('../models/Transaction');

const getSummary = async (req, res) => {
    try {
        const totalIncome = await Transaction.aggregate([
            { $match: { type: 'income' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const totalExpense = await Transaction.aggregate([
            { $match: { type: 'expense' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const income = totalIncome[0]?.total || 0;
        const expense = totalExpense[0]?.total || 0;
        const netBalance = income - expense;

        res.status(200).json({
            success: true,
            data: {
                totalIncome: income,
                totalExpense: expense,
                netBalance
            }
        });
    } catch (error) {
        console.log("Error in getSummary -> ", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const getCategoryTotals = async (req, res) => {
    try {
        const categoryTotals = await Transaction.aggregate([
            {
                $group: {
                    _id: { category: '$category', type: '$type' },
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { total: -1 } }
        ]);

        res.status(200).json({
            success: true,
            data: categoryTotals
        });
    } catch (error) {
        console.log("Error in getCategoryTotals -> ", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const getMonthlyTrends = async (req, res) => {
    try {
        const trends = await Transaction.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' },
                        type: '$type'
                    },
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } }
        ]);

        res.status(200).json({
            success: true,
            data: trends
        });
    } catch (error) {
        console.log("Error in getMonthlyTrends -> ", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const getWeeklyTrends = async (req, res) => {
    try {
        const trends = await Transaction.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        week: { $week: '$date' },
                        type: '$type'
                    },
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': -1, '_id.week': -1 } }
        ]);

        res.status(200).json({
            success: true,
            data: trends
        });
    } catch (error) {
        console.log("Error in getWeeklyTrends -> ", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const getRecentActivity = async (req, res) => {
    try {
        const recentTransactions = await Transaction.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            count: recentTransactions.length,
            data: recentTransactions
        });
    } catch (error) {
        console.log("Error in getRecentActivity -> ", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

module.exports = {
    getSummary,
    getCategoryTotals,
    getMonthlyTrends,
    getWeeklyTrends,
    getRecentActivity
};