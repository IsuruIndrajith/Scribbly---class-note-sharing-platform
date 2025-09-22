import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell, 
  Download, 
  Heart, 
  MessageCircle, 
  Upload,
  Users,
  CheckCheck,
  Trash2,
  Settings
} from 'lucide-react';

export function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'download',
      title: 'Your note was downloaded',
      message: 'Sarah Chen downloaded your "Binary Trees Notes"',
      time: '2 hours ago',
      read: false,
      avatar: 'SC'
    },
    {
      id: 2,
      type: 'like',
      title: 'New like on your note',
      message: 'Mike Johnson liked your "Algorithm Analysis" notes',
      time: '5 hours ago',
      read: false,
      avatar: 'MJ'
    },
    {
      id: 3,
      type: 'comment',
      title: 'New comment',
      message: 'Emma Davis commented on your "Database Design" notes',
      time: '1 day ago',
      read: false,
      avatar: 'ED'
    },
    {
      id: 4,
      type: 'upload',
      title: 'New note in your subject',
      message: 'Alex Rodriguez uploaded "Advanced Algorithms - Dynamic Programming"',
      time: '1 day ago',
      read: true,
      avatar: 'AR'
    },
    {
      id: 5,
      type: 'follow',
      title: 'New follower',
      message: 'Lisa Wang started following your notes',
      time: '2 days ago',
      read: true,
      avatar: 'LW'
    },
    {
      id: 6,
      type: 'download',
      title: 'Multiple downloads',
      message: 'Your "Data Structures" notes reached 25 downloads!',
      time: '3 days ago',
      read: true,
      avatar: null
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'download':
        return <Download className="size-4 text-green-600" />;
      case 'like':
        return <Heart className="size-4 text-red-600" />;
      case 'comment':
        return <MessageCircle className="size-4 text-blue-600" />;
      case 'upload':
        return <Upload className="size-4 text-purple-600" />;
      case 'follow':
        return <Users className="size-4 text-orange-600" />;
      default:
        return <Bell className="size-4 text-gray-600" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const allNotifications = notifications;
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated on your notes and community activity
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="size-4 mr-2" />
            Settings
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck className="size-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Notification Count */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="size-5 text-blue-600" />
              <span>You have {unreadCount} unread notifications</span>
            </div>
            {unreadCount > 0 && (
              <Badge variant="default" className="bg-blue-600">
                {unreadCount}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notifications Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All ({allNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 px-1 py-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {allNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="size-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg mb-2">No notifications yet</h3>
                <p className="text-muted-foreground">
                  We'll notify you when there's activity on your notes
                </p>
              </CardContent>
            </Card>
          ) : (
            allNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`cursor-pointer transition-colors ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                      {notification.avatar ? (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {notification.avatar}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        getNotificationIcon(notification.type)
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-sm">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-3">
          {unreadNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCheck className="size-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg mb-2">You're all caught up!</h3>
                <p className="text-muted-foreground">
                  No unread notifications at the moment
                </p>
              </CardContent>
            </Card>
          ) : (
            unreadNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className="cursor-pointer bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors"
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                      {notification.avatar ? (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {notification.avatar}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        getNotificationIcon(notification.type)
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-sm">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}