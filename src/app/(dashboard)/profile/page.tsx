import { Avatar, AvatarFallback, AvatarImage } from '@ipa/components/ui/avatar'
import { Button } from '@ipa/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@ipa/components/ui/card'
import { Separator } from '@ipa/components/ui/separator'
import { auth } from '@ipa/lib/auth'
import { prisma } from '@ipa/lib/prisma'
import { getFirstLetters } from '@ipa/utils/get-first-letters'
import { slugify } from '@ipa/utils/slug'
import { Key, Mail, Settings, User } from 'lucide-react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { EditProfileModal } from './components/edit-profile-modal'

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/auth/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      image: true,
      bio: true,
    },
  })

  if (!user) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="mx-auto max-w-4xl w-full py-8 px-4 space-y-8 animate-in fade-in-0 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center animate-in slide-in-from-top-4 duration-700 delay-100">
        {/* Avatar Section */}
        <div className="relative group">
          <div className="relative">
            <Avatar className="size-32 md:size-40 border-4 border-background shadow-xl ring-2 ring-transparent group-hover:ring-blue-500/20 transition-all duration-300">
              <AvatarImage
                src={session.user.image ?? ''}
                alt={session.user.name}
                className="transition-all duration-300 group-hover:scale-105"
              />
              <AvatarFallback className="text-2xl font-semibold">
                {getFirstLetters(session.user.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {session.user.name}
              </h1>
            </div>

            <div className="flex flex-col text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                <span>{session.user.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>@{user.username}</span>
              </div>
            </div>
          </div>

          <EditProfileModal
            user={{
              name: user.name,
              email: user.email,
              username: user.username ?? slugify(user.name),
              id: user.id,
              bio: user.bio ?? '',
              avatar: user.image ?? '',
            }}
          />
        </div>
      </div>

      <Separator />

      {/* Bio and Info Section */}
      <div className="grid gap-6 animate-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="md:col-span-2 space-y-6">
          {/* Bio Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" />
                Sobre mim
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {user.bio}
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
      </div>
    </div>
  )
}
