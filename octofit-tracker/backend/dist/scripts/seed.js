import { mongoose, connectToDatabase } from '../config/database.js';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await connectToDatabase();
    await Promise.all([
        User.deleteMany({}),
        Team.deleteMany({}),
        Activity.deleteMany({}),
        Leaderboard.deleteMany({}),
        Workout.deleteMany({}),
    ]);
    const users = await User.insertMany([
        {
            id: 'user-1',
            name: 'Ava Monroe',
            email: 'ava.monroe@example.com',
            role: 'Runner',
            joined: '2026-01-12',
            teamIds: ['team-1'],
        },
        {
            id: 'user-2',
            name: 'Kai Patel',
            email: 'kai.patel@example.com',
            role: 'Cyclist',
            joined: '2026-02-03',
            teamIds: ['team-2'],
        },
        {
            id: 'user-3',
            name: 'Maya Chen',
            email: 'maya.chen@example.com',
            role: 'Triathlete',
            joined: '2026-02-14',
            teamIds: ['team-1'],
        },
    ]);
    const teams = await Team.insertMany([
        { id: 'team-1', name: 'OctoRunners', members: 8, createdAt: '2025-11-09' },
        { id: 'team-2', name: 'FitForce', members: 12, createdAt: '2025-12-17' },
    ]);
    const activities = await Activity.insertMany([
        {
            id: 'activity-1',
            userId: 'user-1',
            userName: 'Ava Monroe',
            type: 'Run',
            duration: 45,
            calories: 420,
            date: '2026-05-20',
            distanceKm: 9.2,
        },
        {
            id: 'activity-2',
            userId: 'user-2',
            userName: 'Kai Patel',
            type: 'Cycle',
            duration: 60,
            calories: 550,
            date: '2026-05-19',
            distanceKm: 24.5,
        },
        {
            id: 'activity-3',
            userId: 'user-3',
            userName: 'Maya Chen',
            type: 'Swim',
            duration: 35,
            calories: 320,
            date: '2026-05-18',
            distanceKm: 2.0,
        },
    ]);
    const leaderboardEntries = await Leaderboard.insertMany([
        { rank: 1, userId: 'user-1', userName: 'Ava Monroe', score: 980, totalActivities: 24 },
        { rank: 2, userId: 'user-2', userName: 'Kai Patel', score: 934, totalActivities: 22 },
        { rank: 3, userId: 'user-3', userName: 'Maya Chen', score: 896, totalActivities: 20 },
    ]);
    const workouts = await Workout.insertMany([
        {
            id: 'workout-1',
            title: 'Morning HIIT',
            durationMinutes: 30,
            level: 'Intermediate',
            focus: 'Cardio',
            description: 'A fast-paced interval session to boost stamina and metabolism.',
        },
        {
            id: 'workout-2',
            title: 'Recovery Yoga',
            durationMinutes: 20,
            level: 'Beginner',
            focus: 'Flexibility',
            description: 'A gentle stretch routine for active recovery and mobility.',
        },
        {
            id: 'workout-3',
            title: 'Strength Builder',
            durationMinutes: 40,
            level: 'Advanced',
            focus: 'Strength',
            description: 'Bodyweight and resistance exercises for full-body power.',
        },
    ]);
    console.log(`Inserted ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboardEntries.length} leaderboard entries, ${workouts.length} workouts`);
    await mongoose.disconnect();
    console.log('MongoDB connection closed after seeding.');
}
seed().catch((error) => {
    console.error('Failed to seed the database:', error);
    process.exit(1);
});
