async function resolveEventually(data, waitMs = 500) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(data), waitMs)
  )
}

export default {
  listItems() {
    const items = [
      {
        rank: 1,
        item_name: 'Fruit Snacks',
        item_details: {
          description: 'Welch'
        }
      },
      {
        rank: 2,
        item_name: 'Pretzels',
        item_details: {
          description: ''
        }
      },
      {
        rank: 3,
        item_name: 'Chocolate Chip Cookies',
        item_details: {
          description: ''
        }
      },
      {
        rank: 4,
        item_name: 'Clementines',
        item_details: {
          description: ''
        }
      },
      {
        rank: 5,
        item_name: 'Sun Chips',
        item_details: {
          description: 'Cheddar Cheese'
        }
      },
      {
        rank: 6,
        item_name: 'Diet Coke',
        item_details: {
          description: ''
        }
      },
      {
        rank: 7,
        item_name: 'Lemonade',
        item_details: {
          description: ''
        }
      },
      {
        rank: 8,
        item_name: 'Cheese Sticks',
        item_details: {
          description: ''
        }
      },
      {
        rank: 9,
        item_name: 'Pop Tarts',
        item_details: {
          description: ''
        }
      },
      {
        rank: 10,
        item_name: 'Vitamin Water',
        item_details: {
          description: 'Strawberry-Kiwi'
        }
      }
    ]

    return resolveEventually(items)
  }
}
