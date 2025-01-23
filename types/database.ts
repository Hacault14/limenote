export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'viewer'

interface NotificationPreferences {
  email: boolean;
}

export interface DatabaseTypes {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
          owner_id: string
          settings: Json
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
          owner_id: string
          settings?: Json
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
          owner_id?: string
          settings?: Json
        }
      }
      workspace_members: {
        Row: {
          workspace_id: string
          user_id: string
          role: WorkspaceRole
          created_at: string
        }
        Insert: {
          workspace_id: string
          user_id: string
          role: WorkspaceRole
          created_at?: string
        }
        Update: {
          workspace_id?: string
          user_id?: string
          role?: WorkspaceRole
          created_at?: string
        }
      }
      pages: {
        Row: {
          id: string
          workspace_id: string
          title: string
          content: Json
          created_at: string
          updated_at: string
          created_by: string | null
          parent_id: string | null
          is_published: boolean
          published_settings: Json
          icon: string | null
          cover_image: string | null
        }
        Insert: {
          id?: string
          workspace_id: string
          title: string
          content?: Json
          created_at?: string
          updated_at?: string
          created_by?: string | null
          parent_id?: string | null
          is_published?: boolean
          published_settings?: Json
          icon?: string | null
          cover_image?: string | null
        }
        Update: {
          id?: string
          workspace_id?: string
          title?: string
          content?: Json
          created_at?: string
          updated_at?: string
          created_by?: string | null
          parent_id?: string | null
          is_published?: boolean
          published_settings?: Json
          icon?: string | null
          cover_image?: string | null
        }
      }
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
      user_settings: {
        Row: {
          user_id: string
          theme: string
          notification_preferences: NotificationPreferences
          last_workspace_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          theme?: string
          notification_preferences?: NotificationPreferences
          last_workspace_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          theme?: string
          notification_preferences?: NotificationPreferences
          last_workspace_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      page_analytics: {
        Row: {
          id: string
          page_id: string
          views: number
          unique_visitors: number
          analytics_data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          page_id: string
          views?: number
          unique_visitors?: number
          analytics_data?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          page_id?: string
          views?: number
          unique_visitors?: number
          analytics_data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      sync_logs: {
        Row: {
          id: string
          user_id: string
          workspace_id: string
          sync_type: string
          status: string
          details: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          workspace_id: string
          sync_type: string
          status: string
          details?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          workspace_id?: string
          sync_type?: string
          status?: string
          details?: Json
          created_at?: string
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

export type Tables<T extends keyof DatabaseTypes['public']['Tables']> = DatabaseTypes['public']['Tables'][T]['Row']
export type Insertables<T extends keyof DatabaseTypes['public']['Tables']> = DatabaseTypes['public']['Tables'][T]['Insert']
export type Updateables<T extends keyof DatabaseTypes['public']['Tables']> = DatabaseTypes['public']['Tables'][T]['Update']

export type Database = DatabaseTypes 