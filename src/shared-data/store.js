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
        quantity: 10,
      },
      {
        name: 'Phoenix Feather',
        type: 'magical',
        description:
          'A feather from a phoenix, known for its regenerative properties and used in potions to boost vitality.',
        rarity: 'rare',
        quantity: 10,
      },
      {
        name: 'Dragon Scale',
        type: 'mineral',
        description:
          'A scale from a dragon, prized for its strength and used in potions to enhance physical resilience.',
        rarity: 'legendary',
        quantity: 10,
      },
    ],
    mixerState: [],
    feedbackArray: [
      {
        message: 'Welcome to Potion Panic! Hit the next button to begin.',
        correct_ingredients: [],
        incorrect_ingredients: [],
        is_correct: false,
      },
      {
        message: 'Each day you will be given a potion request, and you must mix the correct ingredients to fulfill it.',
        correct_ingredients: [],
        incorrect_ingredients: [],
        is_correct: false,
      },
      {
        message: "This game is all about experimentation and learning, but don't worry, you have three tries to get it right each day.",
        correct_ingredients: [],
        incorrect_ingredients: [],
        is_correct: false,
      },
      {
        message: 'As you progress, you will unlock new ingredients and recipes, allowing you to create more complex potions.',
        correct_ingredients: [],
        incorrect_ingredients: [],
        is_correct: false,
      },
      {
        message: 'Remember, the more potions you make, the more ingredients you will have access to each try.',
        correct_ingredients: [],
        incorrect_ingredients: [],
        is_correct: false,
      },
      {
        message: 'Good luck, and may your potions be potent!',
        correct_ingredients: [],
        incorrect_ingredients: [],
        is_correct: false,
      },
    ],
    feedbackIndex: 0,
    currentFeedback: {
      message: '',
      correct_ingredients: [],
      incorrect_ingredients: [],
      is_correct: false,
    },

    dayProgress: 0,
    triesLeft: 8,
    totalPotionsMade: 0,
    gameState: 'ongoing',
    userName: '',
  },
}
