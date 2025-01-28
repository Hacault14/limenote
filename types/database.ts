export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      files: {
        Row: {
          id: string
          workspace_id: string
          name: string
          size: number
          type: string
          path: string
          uploaded_by: string | null
          created_at: string
          page_id: string | null
        }
        Insert: {
          id?: string
          workspace_id: string
          name: string
          size: number
          type: string
          path: string
          uploaded_by?: string | null
          created_at?: string
          page_id?: string | null
        }
        Update: {
          id?: string
          workspace_id?: string
          name?: string
          size?: number
          type?: string
          path?: string
          uploaded_by?: string | null
          created_at?: string
          page_id?: string | null
        }
      }
      pages: {
        Row: {
          id: string
          workspace_id: string
          title: string
          content: Json | null
          created_at: string
          updated_at: string
          created_by: string | null
          parent_id: string | null
          is_published: boolean | null
          published_settings: Json | null
          icon: string | null
          cover_image: string | null
          is_favorite: boolean | null
          position_index: number | null
        }
        Insert: {
          id?: string
          workspace_id: string
          title: string
          content?: Json | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          parent_id?: string | null
          is_published?: boolean | null
          published_settings?: Json | null
          icon?: string | null
          cover_image?: string | null
          is_favorite?: boolean | null
          position_index?: number | null
        }
        Update: {
          id?: string
          workspace_id?: string
          title?: string
          content?: Json | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          parent_id?: string | null
          is_published?: boolean | null
          published_settings?: Json | null
          icon?: string | null
          cover_image?: string | null
          is_favorite?: boolean | null
          position_index?: number | null
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          has_completed_onboarding: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          has_completed_onboarding?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          has_completed_onboarding?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          user_id: string
          theme: string | null
          notification_preferences: Json | null
          last_workspace_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          theme?: string | null
          notification_preferences?: Json | null
          last_workspace_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          theme?: string | null
          notification_preferences?: Json | null
          last_workspace_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workspace_members: {
        Row: {
          workspace_id: string
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          workspace_id: string
          user_id: string
          role: string
          created_at?: string
        }
        Update: {
          workspace_id?: string
          user_id?: string
          role?: string
          created_at?: string
        }
      }
      workspaces: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
          owner_id: string
          settings: Json | null
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
          owner_id: string
          settings?: Json | null
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
          owner_id?: string
          settings?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for easier table access
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
