export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      entrepreneur_profiles: {
        Row: {
          bio: string | null;
          business_name: string | null;
          business_stage: string | null;
          city: string | null;
          created_at: string;
          id: string;
          industry: string | null;
          updated_at: string;
        };
        Insert: {
          bio?: string | null;
          business_name?: string | null;
          business_stage?: string | null;
          city?: string | null;
          created_at?: string;
          id: string;
          industry?: string | null;
          updated_at?: string;
        };
        Update: {
          bio?: string | null;
          business_name?: string | null;
          business_stage?: string | null;
          city?: string | null;
          created_at?: string;
          id?: string;
          industry?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      mentor_profiles: {
        Row: {
          bio: string | null;
          created_at: string;
          expertise: string[] | null;
          id: string;
          is_verified: boolean;
          linkedin_url: string | null;
          updated_at: string;
          years_experience: number | null;
        };
        Insert: {
          bio?: string | null;
          created_at?: string;
          expertise?: string[] | null;
          id: string;
          is_verified?: boolean;
          linkedin_url?: string | null;
          updated_at?: string;
          years_experience?: number | null;
        };
        Update: {
          bio?: string | null;
          created_at?: string;
          expertise?: string[] | null;
          id?: string;
          is_verified?: boolean;
          linkedin_url?: string | null;
          updated_at?: string;
          years_experience?: number | null;
        };
        Relationships: [];
      };
      mentorships: {
        Row: {
          ended_at: string | null;
          entrepreneur_id: string;
          id: string;
          mentor_id: string;
          started_at: string;
          status: string;
        };
        Insert: {
          ended_at?: string | null;
          entrepreneur_id: string;
          id?: string;
          mentor_id: string;
          started_at?: string;
          status?: string;
        };
        Update: {
          ended_at?: string | null;
          entrepreneur_id?: string;
          id?: string;
          mentor_id?: string;
          started_at?: string;
          status?: string;
        };
        Relationships: [];
      };
      student_profiles: {
        Row: {
          bio: string | null;
          career_goal: string | null;
          city: string | null;
          created_at: string;
          education_level: string | null;
          id: string;
          target_skills: string[] | null;
          updated_at: string;
        };
        Insert: {
          bio?: string | null;
          career_goal?: string | null;
          city?: string | null;
          created_at?: string;
          education_level?: string | null;
          id: string;
          target_skills?: string[] | null;
          updated_at?: string;
        };
        Update: {
          bio?: string | null;
          career_goal?: string | null;
          city?: string | null;
          created_at?: string;
          education_level?: string | null;
          id?: string;
          target_skills?: string[] | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          is_active: boolean;
          phone: string | null;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email: string;
          full_name?: string;
          id: string;
          is_active?: boolean;
          phone?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          is_active?: boolean;
          phone?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_my_role: {
        Args: Record<string, never>;
        Returns: Database["public"]["Enums"]["user_role"];
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      user_role: "emprendedor" | "mentor" | "administrador" | "estudiante";
    };
    CompositeTypes: Record<string, never>;
  };
};

export type UserRole = Database["public"]["Enums"]["user_role"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
