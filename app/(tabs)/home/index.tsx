import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { router } from 'expo-router';
import { ComponentProps, Fragment } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

const ALERT_ICONS = {
  alert: 'error-outline',
  meeting: 'event-available',
  task: 'check-circle-outline',
} as const satisfies Record<string, MaterialIconName>;

const QUICK_ICONS = {
  fleet: 'local-shipping',
  customer: 'support-agent',
  finance: 'insights',
} as const satisfies Record<string, MaterialIconName>;

type ActivityIconKey = keyof typeof ALERT_ICONS;
type QuickIconKey = keyof typeof QUICK_ICONS;

type ActivityItem = {
  title: string;
  description: string;
  icon: ActivityIconKey;
  badge?: string;
};

type QuickAction = {
  key: string;
  title: string;
  iconName: QuickIconKey;
  iconBackground: string;
  iconColor: string;
  highlights: string[];
};

const ACTIVITIES: ActivityItem[] = [
  {
    title: 'Alerts',
    description: '3 new vehicle alerts need review.',
    icon: 'alert',
    badge: 'High',
  },
  {
    title: 'Scheduled Meeting',
    description: 'Fleet sync at 2:30 PM with Ops Team.',
    icon: 'meeting',
  },
  {
    title: 'Upcoming Task',
    description: 'Finalize maintenance roster draft.',
    icon: 'task',
  },
];

const QUICK_ACTIONS: QuickAction[] = [
  {
    key: 'fleet-management',
    title: 'Fleet Management',
    iconName: 'fleet',
    iconBackground: '#E0F2FE',
    iconColor: '#0A7EA4',
    highlights: ['5 open routes', '2 drivers idle'],
  },
  {
    key: 'support-center',
    title: 'Support Center',
    iconName: 'customer',
    iconBackground: '#FCE7F3',
    iconColor: '#C026D3',
    highlights: ['12 tickets today', 'Avg. response 4m'],
  },
  {
    key: 'analytics',
    title: 'Analytics',
    iconName: 'finance',
    iconBackground: '#F3E8FF',
    iconColor: '#7C3AED',
    highlights: ['Revenue +6%', 'New trend report'],
  },
];

const NEWS_ITEMS = [
  {
    title: 'Route optimization update',
    detail: 'Dynamic routing now available for weekend deliveries.',
    time: '2h ago',
  },
  {
    title: 'New driver onboarding',
    detail: 'Five new drivers joined the fleet this week.',
    time: 'Yesterday',
  },
];

export default function HomeScreen() {
  const navigateToNotifications = () => router.push('/notifications');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.logo}>BGS Mobile</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View notifications"
            accessibilityHint="Opens the notifications screen"
            onPress={navigateToNotifications}
            hitSlop={8}>
            <MaterialIcons name="notifications-none" size={28} color={Colors.light.text} />
          </Pressable>
        </View>

        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>KP</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Kelly Peterson</Text>
            <Text style={styles.userRole}>Senior Fleet Coordinator</Text>
          </View>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>On duty</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today&apos;s focus</Text>
            <Pressable style={styles.sectionAction}>
              <Text style={styles.sectionActionText}>View all</Text>
            </Pressable>
          </View>
          <View style={styles.activityList}>
            {ACTIVITIES.map((activity) => (
              <View key={activity.title} style={styles.activityCard}>
                <View
                  style={[
                    styles.activityIcon,
                    { backgroundColor: Colors.light.card },
                  ]}>
                  <MaterialIcons
                    name={ALERT_ICONS[activity.icon]}
                    size={22}
                    color={Colors.light.tint}
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                </View>
                {activity.badge ? (
                  <View style={styles.activityBadge}>
                    <Text style={styles.activityBadgeText}>{activity.badge}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick actions</Text>
            <Pressable style={styles.addActionButton} accessibilityRole="button">
              <MaterialIcons name="add" size={20} color={Colors.light.tint} />
              <Text style={styles.addActionText}>Add action</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsRow}
            snapToAlignment="start"
            decelerationRate="fast">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.key}
                href={{ pathname: '/services/[key]', params: { key: action.key } }}
                asChild>
                <Pressable
                  style={styles.quickActionCard}
                  accessibilityRole="button"
                  accessibilityLabel={`Open ${action.title}`}
                  hitSlop={4}>
                  <View
                    style={[
                      styles.quickActionIcon,
                      { backgroundColor: action.iconBackground },
                    ]}>
                    <MaterialIcons
                      name={QUICK_ICONS[action.iconName]}
                      size={24}
                      color={action.iconColor}
                    />
                  </View>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <View style={styles.quickHighlights}>
                    {action.highlights.map((highlight) => (
                      <View key={highlight} style={styles.quickHighlightPill}>
                        <Text style={styles.quickHighlightText}>{highlight}</Text>
                      </View>
                    ))}
                  </View>
                </Pressable>
              </Link>
            ))}
            <Pressable style={styles.quickActionGhost} accessibilityRole="button">
              <MaterialIcons name="apps" size={26} color={Colors.light.icon} />
              <Text style={styles.quickGhostText}>Customize actions</Text>
            </Pressable>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest news</Text>
            <Pressable style={styles.sectionAction}>
              <Text style={styles.sectionActionText}>View archive</Text>
            </Pressable>
          </View>
          <View style={styles.newsList}>
            {NEWS_ITEMS.map((item, index) => (
              <Fragment key={`${item.title}-${index}`}>
                <View style={styles.newsItem}>
                  <View style={styles.newsMeta}>
                    <Text style={styles.newsTitle}>{item.title}</Text>
                    <Text style={styles.newsTime}>{item.time}</Text>
                  </View>
                  <Text style={styles.newsDetail}>{item.detail}</Text>
                </View>
                {index < NEWS_ITEMS.length - 1 ? <View style={styles.newsDivider} /> : null}
              </Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.tint,
  },
  userDetails: {
    flex: 1,
    gap: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  userRole: {
    fontSize: 14,
    color: Colors.light.icon,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#DCFCE7',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#15803D',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#15803D',
    textTransform: 'uppercase',
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  sectionAction: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sectionActionText: {
    fontSize: 14,
    color: Colors.light.tint,
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
    gap: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  activityDescription: {
    fontSize: 14,
    color: Colors.light.icon,
  },
  activityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#FEF3C7',
  },
  activityBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B45309',
    textTransform: 'uppercase',
  },
  addActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#E0F2FE',
  },
  addActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.tint,
  },
  quickActionsRow: {
    gap: 16,
    paddingRight: 8,
  },
  quickActionCard: {
    width: 240,
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 20,
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  quickHighlights: {
    gap: 8,
  },
  quickHighlightPill: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  quickHighlightText: {
    fontSize: 13,
    color: Colors.light.icon,
  },
  quickActionGhost: {
    width: 160,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 20,
  },
  quickGhostText: {
    fontSize: 14,
    color: Colors.light.icon,
  },
  newsList: {
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  newsItem: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 8,
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    flex: 1,
    paddingRight: 12,
  },
  newsTime: {
    fontSize: 12,
    color: Colors.light.icon,
  },
  newsDetail: {
    fontSize: 14,
    color: Colors.light.icon,
    lineHeight: 20,
  },
  newsDivider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginHorizontal: 20,
  },
});
