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
      profiles: {
        Row: {
          id: string
          full_name: string
          headline: string | null
          email: string | null
          location: string | null
          biography: string | null
          profile_image_path: string | null
          resume_file_path: string | null
          linkedin_url: string | null
          instagram_url: string | null
          facebook_url: string | null
          youtube_url: string | null
          x_url: string | null
          tiktok_url: string | null
          github_url: string | null
          threads_url: string | null
          website_url: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          full_name: string
          headline?: string | null
          email?: string | null
          location?: string | null
          biography?: string | null
          profile_image_path?: string | null
          resume_file_path?: string | null
          linkedin_url?: string | null
          instagram_url?: string | null
          facebook_url?: string | null
          youtube_url?: string | null
          x_url?: string | null
          tiktok_url?: string | null
          github_url?: string | null
          threads_url?: string | null
          website_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          headline?: string | null
          email?: string | null
          location?: string | null
          biography?: string | null
          profile_image_path?: string | null
          resume_file_path?: string | null
          linkedin_url?: string | null
          instagram_url?: string | null
          facebook_url?: string | null
          youtube_url?: string | null
          x_url?: string | null
          tiktok_url?: string | null
          github_url?: string | null
          threads_url?: string | null
          website_url?: string | null
          updated_at?: string | null
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string
          description: string | null
          proficiency: string | null
          icon: string | null
          logo_path: string | null
          external_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          description?: string | null
          proficiency?: string | null
          icon?: string | null
          logo_path?: string | null
          external_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          description?: string | null
          proficiency?: string | null
          icon?: string | null
          logo_path?: string | null
          external_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      experience: {
        Row: {
          id: string
          organization: string
          role: string
          employment_type: string | null
          start_date: string | null
          end_date: string | null
          duration_label: string | null
          description: string | null
          responsibilities: Json
          organization_logo_path: string | null
          sort_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization: string
          role: string
          employment_type?: string | null
          start_date?: string | null
          end_date?: string | null
          duration_label?: string | null
          description?: string | null
          responsibilities?: Json
          organization_logo_path?: string | null
          sort_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization?: string
          role?: string
          employment_type?: string | null
          start_date?: string | null
          end_date?: string | null
          duration_label?: string | null
          description?: string | null
          responsibilities?: Json
          organization_logo_path?: string | null
          sort_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      certifications: {
        Row: {
          id: string
          cert_id: string
          title: string
          issuer: string
          recipient_name: string
          category: string | null
          summary: string | null
          skills_covered: string[]
          issuer_partners_shown: string[]
          issuing_organizations_shown: string[]
          issue_date: string | null
          expiry_date: string | null
          valid_from: string | null
          completion_date: string | null
          credential_id: string | null
          exam_id: string | null
          verification_url: string | null
          verification_status: string
          qr_code_present: boolean
          source_file: string | null
          public_path: string
          file_type: string
          display_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cert_id: string
          title: string
          issuer: string
          recipient_name: string
          category?: string | null
          summary?: string | null
          skills_covered?: string[]
          issuer_partners_shown?: string[]
          issuing_organizations_shown?: string[]
          issue_date?: string | null
          expiry_date?: string | null
          valid_from?: string | null
          completion_date?: string | null
          credential_id?: string | null
          exam_id?: string | null
          verification_url?: string | null
          verification_status?: string
          qr_code_present?: boolean
          source_file?: string | null
          public_path: string
          file_type: string
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cert_id?: string
          title?: string
          issuer?: string
          recipient_name?: string
          category?: string | null
          summary?: string | null
          skills_covered?: string[]
          issuer_partners_shown?: string[]
          issuing_organizations_shown?: string[]
          issue_date?: string | null
          expiry_date?: string | null
          valid_from?: string | null
          completion_date?: string | null
          credential_id?: string | null
          exam_id?: string | null
          verification_url?: string | null
          verification_status?: string
          qr_code_present?: boolean
          source_file?: string | null
          public_path?: string
          file_type?: string
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      education: {
        Row: {
          id: string
          qualification: string
          institution: string
          field_of_study: string | null
          study_start: string | null
          study_end: string | null
          status: string | null
          grade: string | null
          description: string | null
          sort_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          qualification: string
          institution: string
          field_of_study?: string | null
          study_start?: string | null
          study_end?: string | null
          status?: string | null
          grade?: string | null
          description?: string | null
          sort_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          qualification?: string
          institution?: string
          field_of_study?: string | null
          study_start?: string | null
          study_end?: string | null
          status?: string | null
          grade?: string | null
          description?: string | null
          sort_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          category: string | null
          summary: string | null
          objectives: string | null
          target_audience: string | null
          strategy: string | null
          channels: Json
          tools: Json
          deliverables: Json
          results: Json
          cover_image_path: string | null
          gallery: Json
          external_url: string | null
          is_featured: boolean
          is_published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          category?: string | null
          summary?: string | null
          objectives?: string | null
          target_audience?: string | null
          strategy?: string | null
          channels?: Json
          tools?: Json
          deliverables?: Json
          results?: Json
          cover_image_path?: string | null
          gallery?: Json
          external_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          category?: string | null
          summary?: string | null
          objectives?: string | null
          target_audience?: string | null
          strategy?: string | null
          channels?: Json
          tools?: Json
          deliverables?: Json
          results?: Json
          cover_image_path?: string | null
          gallery?: Json
          external_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string | null
          message?: string
          status?: string
          created_at?: string
        }
      }
      admin_roles: {
        Row: {
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          user_id: string
          role: string
          created_at?: string
        }
        Update: {
          user_id?: string
          role?: string
          created_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          description: string | null
          image_path: string
          date: string | null
          display_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_path: string
          date?: string | null
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_path?: string
          date?: string | null
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
