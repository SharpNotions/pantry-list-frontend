// Provide a basic mock for the `fetch` global function.
global.fetch = data => Promise.resolve(data)
