import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  parentEmail?: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (userData: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  age?: number;
  parentEmail?: string;
  interests?: string;
  experience?: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Local storage keys
const USER_KEY = "jengacode_user";
const USERS_KEY = "jengacode_users";

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user database in localStorage
class AuthService {
  private getUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  private getCurrentUser(): User | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  private setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }

  async signUp(userData: SignUpData): Promise<{ success: boolean; error?: string; user?: User }> {
    await delay(1000); // Simulate API call

    const users = this.getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: "User with this email already exists" };
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: userData.email,
      name: userData.name,
      age: userData.age,
      parentEmail: userData.parentEmail,
      isAdmin: false,
      createdAt: new Date().toISOString(),
    };

    // Save user to "database"
    users.push(newUser);
    this.saveUsers(users);

    // Auto sign in after registration
    this.setCurrentUser(newUser);

    return { success: true, user: newUser };
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    await delay(800); // Simulate API call

    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return { success: false, error: "No account found with this email" };
    }

    // For demo purposes, any password works
    // In real app, you'd verify against hashed password
    
    this.setCurrentUser(user);
    return { success: true, user };
  }

  async signOut(): Promise<void> {
    await delay(300);
    this.setCurrentUser(null);
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<{ success: boolean; error?: string; user?: User }> {
    await delay(500);

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return { success: false, error: "User not found" };
    }

    // Update user data
    const updatedUser = { ...users[userIndex], ...data };
    users[userIndex] = updatedUser;
    this.saveUsers(users);

    // Update current user if it's the same user
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      this.setCurrentUser(updatedUser);
    }

    return { success: true, user: updatedUser };
  }

  getCurrentUserSync(): User | null {
    return this.getCurrentUser();
  }

  // Initialize demo admin user
  async initializeDemo(): Promise<void> {
    const users = this.getUsers();
    
    // Create admin user if none exists
    if (!users.find(u => u.isAdmin)) {
      const adminUser: User = {
        id: "admin_demo",
        email: "admin@jengacode.org",
        name: "JengaCode Admin",
        isAdmin: true,
        createdAt: new Date().toISOString(),
      };
      users.push(adminUser);
      this.saveUsers(users);
    }
  }
}

export const authService = new AuthService();

// Hook for auth state management
export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize demo data
    authService.initializeDemo();
    
    // Get current user
    const currentUser = authService.getCurrentUserSync();
    setUser(currentUser);
    setLoading(false);

    // Listen for storage changes (logout from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === USER_KEY) {
        const newUser = e.newValue ? JSON.parse(e.newValue) : null;
        setUser(newUser);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const result = await authService.signIn(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  };

  const signUp = async (userData: SignUpData) => {
    setLoading(true);
    const result = await authService.signUp(userData);
    if (result.success && result.user) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    setLoading(true);
    await authService.signOut();
    setUser(null);
    setLoading(false);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return { success: false, error: "No user logged in" };
    
    setLoading(true);
    const result = await authService.updateProfile(user.id, data);
    if (result.success && result.user) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
}
