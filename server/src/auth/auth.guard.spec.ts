import { AuthGuard } from './deviceId.guard'

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined()
  })
})
