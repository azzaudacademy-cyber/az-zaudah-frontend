import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  full_name?: string | null;
  role?: string | null; // "student" | "teacher" | "admin" etc.
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    setLoading(true);

    // Get current user
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error loading user:", error.message);
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    const currentUser = data.user ?? null;
    setUser(currentUser);

    if (currentUser) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, role")
        .eq("id", currentUser.id)
        .single();

      if (profileError) {
        console.error("Error loading profile:", profileError.message);
        setProfile(null);
      } else {
        setProfile(profileData as Profile);
      }
    } else {
      setProfile(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    // Initial load
    loadUser();

    // Listen for auth changes (login, logout, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, _session) => {
      loadUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}