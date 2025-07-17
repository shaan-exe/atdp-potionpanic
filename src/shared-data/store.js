export default {
  gameData: {
    currentRequest: {},
    inventory: [
      {
        name: 'Mandrake Root',
        type: 'herb',
        description:
          'A root known for its magical properties, often used in potions to enhance learning and memory.',
        rarity: 'common',
      },
      {
        name: 'Phoenix Feather',
        type: 'magical',
        description:
          'A feather from a phoenix, known for its regenerative properties and used in potions to boost vitality.',
        rarity: 'rare',
      },
      {
        name: 'Dragon Scale',
        type: 'mineral',
        description:
          'A scale from a dragon, prized for its strength and used in potions to enhance physical resilience.',
        rarity: 'legendary',
      },
    ],
    mixerState: [],
    feedback: '',
    dayProgress: 0,
    triesLeft: 3,
    totalPotionsMade: 0,
    gameState: 'ongoing',
  },
}
