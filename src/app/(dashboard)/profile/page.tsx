'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@ipa/components/ui/avatar'
import { Badge } from '@ipa/components/ui/badge'
import { Button } from '@ipa/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ipa/components/ui/card'
import { Separator } from '@ipa/components/ui/separator'
import {
  Activity,
  AtSign,
  Calendar,
  Camera,
  Clock,
  Edit3,
  ExternalLink,
  Eye,
  Globe,
  Key,
  Mail,
  MapPin,
  Settings,
  Shield,
  Trash2,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

import { EditProfileModal } from './components/edit-profile-modal'

// Mock user data inspired by dev platforms
const mockUser = {
  name: 'Alex Developers',
  email: 'alex@developers.io',
  username: 'alexdev',
  bio: 'Full-stack developer passionate about creating amazing user experiences. Building the future of web development.',
  location: 'São Paulo, Brazil',
  website: 'https://alexdev.io',
  avatar: 'https://github.com/shadcn.png',
  joinedAt: 'March 2022',
  isVerified: true,
}

// Mock activity data
const mockStats = [
  {
    label: 'Projects Created',
    value: '24',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    label: 'Total Inspections',
    value: '156',
    icon: Activity,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    label: 'Hours Logged',
    value: '432',
    icon: Clock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    label: 'Success Rate',
    value: '98%',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
]

const recentActivity = [
  {
    action: 'Completed inspection',
    target: 'Pump Station #12',
    time: '2 hours ago',
  },
  {
    action: 'Created new project',
    target: 'Industrial Complex A',
    time: '1 day ago',
  },
  {
    action: 'Updated report',
    target: 'Safety Checklist v2.1',
    time: '3 days ago',
  },
  {
    action: 'Scheduled inspection',
    target: 'Conveyor System #5',
    time: '1 week ago',
  },
]

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <>
      <div className="mx-auto max-w-4xl py-8 px-4 space-y-8 animate-in fade-in-0 duration-700">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 items-start animate-in slide-in-from-top-4 duration-700 delay-100">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="relative">
              <Avatar className="size-32 md:size-40 border-4 border-background shadow-xl ring-2 ring-transparent group-hover:ring-blue-500/20 transition-all duration-300">
                <AvatarImage
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="transition-all duration-300 group-hover:scale-105"
                />
                <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white animate-pulse">
                  {mockUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              {/* Animated ring effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 animate-pulse"></div>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="absolute bottom-2 right-2 size-10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-xl bg-white/90 backdrop-blur-sm border-2 border-white/20"
            >
              <Camera className="size-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  {mockUser.name}
                </h1>
                {mockUser.isVerified && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    <Shield className="size-3" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="size-4" />
                  <span>{mockUser.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>@{mockUser.username}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 transition-all duration-200 hover:scale-105"
            >
              <Edit3 className="size-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        <Separator />

        {/* Bio and Info Section */}
        <div className="grid gap-6 md:grid-cols-3 animate-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="md:col-span-2 space-y-6">
            {/* Bio Card */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="size-5" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {mockUser.bio}
                </p>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            {/* <div className="space-y-4 @container">
              <h2 className="text-xl font-semibold">Overview</h2>
              <div className="grid grid-cols-1 @sm:grid-cols-2 gap-4">
                {mockStats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <Card
                      key={index}
                      className="border-0 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105 group cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent
                              className={`size-5 ${stat.color} group-hover:animate-pulse`}
                            />
                          </div>
                          <div>
                            <p className="text-2xl font-bold group-hover:text-blue-600 transition-colors duration-300">
                              {stat.value}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {stat.label}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div> */}

            {/* Recent Activity */}
            {/* <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="p-4 hover:bg-muted/50 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.target}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div> */}

            {/* Security & Preferences */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Security & Preferences</h2>
              <div className="grid gap-4">
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01] cursor-pointer">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Key className="size-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Password & Authentication
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Manage your password and 2FA settings
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="size-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01] cursor-pointer">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Zap className="size-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Connected Apps</h3>
                        <p className="text-sm text-muted-foreground">
                          Manage third-party integrations
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="size-4" />
                    </Button>
                  </CardContent>
                </Card> */}

                {/* <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01] cursor-pointer">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Eye className="size-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Privacy & Visibility</h3>
                        <p className="text-sm text-muted-foreground">
                          Control who can see your profile
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="size-4" />
                    </Button>
                  </CardContent>
                </Card> */}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Personal Info Card */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="size-4 text-muted-foreground" />
                  <span>{mockUser.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="size-4 text-muted-foreground" />
                  <a
                    href={mockUser.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline"
                  >
                    alexdev.io
                    <ExternalLink className="size-3" />
                  </a>
                </div>
                <Separator />
                <div className="text-sm text-muted-foreground">
                  Member since {mockUser.joinedAt}
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="text-lg text-red-700">
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  These actions are permanent and cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={mockUser}
      />
    </>
  )
}
