export const queryKeys = {
  all: ['shortUrl'],
  histories: () => [...queryKeys.all, 'histories'],
  history: (id) => [...queryKeys.histories(), id],
}
