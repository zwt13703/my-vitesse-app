import { acceptHMRUpdate, defineStore } from 'pinia'

interface User {
  username: string
  password: string
}

export const useUserStore = defineStore('user', () => {
  /**
   * Current logged-in user.
   */
  const user = ref<User | null>(null)

  // Initialize user from localStorage
  if (typeof window !== 'undefined') {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  /**
   * Login the user.
   *
   * @param username - username to login with
   * @param password - password to login with
   */
  function login(username: string, password: string) {
    const newUser = { username, password }
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  /**
   * Logout the user.
   */
  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  return {
    user,
    login,
    logout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
