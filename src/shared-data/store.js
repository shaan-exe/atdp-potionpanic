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
        quantity: 5,
      },
      {
        name: 'Phoenix Feather',
        type: 'magical',
        description:
          'A feather from a phoenix, known for its regenerative properties and used in potions to boost vitality.',
        rarity: 'rare',
        quantity: 5,
      },
      {
        name: 'Dragon Scale',
        type: 'mineral',
        description:
          'A scale from a dragon, prized for its strength and used in potions to enhance physical resilience.',
        rarity: 'legendary',
        quantity: 5,
      },
    ],
    mixerState: [],
    feedbackArray: [
      'Welcome to Potion Panic! Hit the next button to begin.',
      'Each day you will be given a potion request, and you must mix the correct ingredients to fulfill it.',
      "This game is all about experimentation and learning, but don't worry, you have three tries to get it right each day.",
      'As you progress, you will unlock new ingredients and recipes, allowing you to create more complex potions.',
      'Remember, the more potions you make, the more ingredients you will have access to each try.',
      'Good luck, and may your potions be potent!',
    ],
    feedbackIndex: 0,
    currentFeedback: '',
    dayProgress: 0,
    triesLeft: 3,
    totalPotionsMade: 0,
    gameState: 'ongoing',
  },
}
