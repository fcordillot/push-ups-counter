import { sleep } from '../src/helpers/timer.js'

describe('Timer', () => {
  it('should wait 3 seconds', async () => {
    const t = Date.now()
    await sleep(3000)
    expect(Date.now() - t).toBeGreaterThanOrEqual(3000)
  })
})
