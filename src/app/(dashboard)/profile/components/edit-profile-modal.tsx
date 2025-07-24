'use client'

import { Button } from '@ipa/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@ipa/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ipa/components/ui/form'
import { Input } from '@ipa/components/ui/input'
import { Textarea } from '@ipa/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@ipa/components/ui/avatar'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  email: z.string().email('Please enter a valid email'),
  bio: z.string().max(300, 'Bio must be less than 300 characters').optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    name: string
    email: string
    username: string
    bio: string
    location: string
    website: string
    avatar: string
  }
}

export function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      location: user.location,
      website: user.website,
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Profile updated successfully!')
      onClose()
    } catch (error) {
      toast.error('Failed to update profile. Please try again.')
    }
  }

  const handleAvatarChange = () => {
    // Simulate avatar upload
    toast.success('Avatar upload feature would be implemented here!')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information. Changes will be reflected across the platform.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="size-24 border-4 border-background shadow-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  type="button"
                  size="sm" 
                  variant="secondary" 
                  onClick={handleAvatarChange}
                  className="absolute bottom-0 right-0 size-8 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <Camera className="size-3" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Click the camera icon to change your profile picture
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                        <Input 
                          placeholder="username" 
                          className="pl-8 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com" 
                        type="email"
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="São Paulo, Brazil" 
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://yourwebsite.com" 
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about yourself..." 
                        className="min-h-[100px] resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                        {...field} 
                      />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <FormMessage />
                      <span className="text-xs text-muted-foreground">
                        {field.value?.length || 0}/300
                      </span>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="transition-all duration-200 hover:scale-105"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={form.formState.isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 transition-all duration-200 hover:scale-105"
              >
                {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 