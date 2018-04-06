import { actions, defaultState } from '@/store/item-ranking'

const getFreshState = () => JSON.parse(JSON.stringify(defaultState))

describe('item-ranking', () => {
  describe('moveItemToRankedList', () => {
    it('should not allow ranked list to exceed max', () => {
      const commitMock = jest.fn()
      const state = {
        ...getFreshState(),
        maxRankedItems: 2,
        rankedItems: [{ id: 1 }, { id: 2 }],
        unrankedItems: [{ id: 3 }, { id: 4 }]
      }

      actions.moveItemToRankedList(
        {
          commit: commitMock,
          state
        },
        { id: 5 }
      )

      expect(commitMock).toHaveBeenCalledTimes(4)
      expect(commitMock.mock.calls[0][0]).toBe('addUnrankedItem')
      expect(commitMock.mock.calls[0][1]).toMatchObject({ id: 2 })
      expect(commitMock.mock.calls[1][0]).toBe('removeRankedItem')
      expect(commitMock.mock.calls[1][1]).toMatchObject({ id: 2 })
      expect(commitMock.mock.calls[2][0]).toBe('addRankedItem')
      expect(commitMock.mock.calls[2][1]).toMatchObject({ id: 5 })
      expect(commitMock.mock.calls[3][0]).toBe('removeUnrankedItem')
      expect(commitMock.mock.calls[3][1]).toMatchObject({ id: 5 })
    })
  })

  describe('moveItemToUnrankedList', () => {
    const commitMock = jest.fn()
    const state = {
      ...getFreshState(),
      maxRankedItems: 2,
      rankedItems: [{ id: 0 }, { id: 1 }]
    }
    const itemToRemove = state.rankedItems[0]

    actions.moveItemToUnrankedList(
      {
        commit: commitMock,
        state
      },
      itemToRemove
    )

    expect(commitMock.mock.calls).toHaveLength(2)
    expect(commitMock.mock.calls[0][0]).toBe('addUnrankedItem')
    expect(commitMock.mock.calls[0][1]).toMatchObject(itemToRemove)
    expect(commitMock.mock.calls[1][0]).toBe('removeRankedItem')
    expect(commitMock.mock.calls[1][1]).toMatchObject(itemToRemove)
  })

  describe('setRankedItems', () => {
    const commitMock = jest.fn()
    const state = {
      ...getFreshState(),
      maxRankedItems: 2
    }

    actions.setRankedItems(
      {
        commit: commitMock,
        state
      },
      [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
    )

    expect(commitMock.mock.calls).toHaveLength(3)
    expect(commitMock.mock.calls[0][0]).toBe('addUnrankedItem')
    expect(commitMock.mock.calls[0][1]).toMatchObject({ id: 2 })
    expect(commitMock.mock.calls[1][0]).toBe('addUnrankedItem')
    expect(commitMock.mock.calls[1][1]).toMatchObject({ id: 3 })
    expect(commitMock.mock.calls[2][0]).toBe('setRankedItems')
    expect(commitMock.mock.calls[2][1]).toHaveLength(2)
  })
})
