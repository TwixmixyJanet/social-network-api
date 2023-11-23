const connection = require('../config/connection');
const { User, Thought, reactionSchema, Reaction } = require('../models');

const users = [
    {
        username: "John Doe",
        email: "johndoe@example.com",
    },
    {
        username: "Jane Smith",
        email: "janesmith@example.com",
    },
    {
        username: "Peter Jones",
        email: "peterjones@example.com",
    },
    {
        username: "Mary Davis",
        email: "marydavis@example.com",
    },
    {
        username: "David Williams",
        email: "davidwilliams@example.com",
    },
    {
        username: "Sarah Brown",
        email: "sarahbrown@example.com",
    },
    {
        username: "James Miller",
        email: "jamesmiller@example.com",
    },
    {
        username: "Patricia Johnson",
        email: "patricia@example.com",
    },
    {
        username: "Test1",
        email: "test1@example.com",
    },
]

const thoughts = [
    {
        thoughtText: "This is my first thought!",
        createdAt: new Date('2023-11-23T13:20:00Z'),
        username: "Test1",
        reactions: [],
      },
      {
        thoughtText: "What a beautiful day!",
        createdAt: new Date('2023-11-23T14:30:00Z'),
        username: "Patricia Johnson",
        reactions: [],
      },
      {
        thoughtText: "I'm feeling grateful for all that I have.",
        createdAt: new Date('2023-11-23T15:45:00Z'),
        username: "Sarah Brown",
        reactions: [],
      },
]

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to seeding 🌰🌰🌰');
    await Thought.deleteMany({});
    await User.deleteMany({});

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.info('🌱🌱🌱 Seeding Complete 🌱🌱🌱');
    process.exit(0);
});