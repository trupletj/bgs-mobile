import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

const sampleNotifications = [
  {
    id: '1',
    title: 'Welcome to BGS Mobile',
    message: 'We will keep you posted on important account updates and new features.',
    timestamp: 'Just now',
  },
  {
    id: '2',
    title: 'Enable push alerts',
    message: 'Turn on notifications to receive real-time updates as they happen.',
    timestamp: 'Earlier today',
  },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        {sampleNotifications.map(notification => (
          <View key={notification.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{notification.title}</Text>
              <Text style={styles.cardTimestamp}>{notification.timestamp}</Text>
            </View>
            <Text style={styles.cardMessage}>{notification.message}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.footer}>You&apos;re all caught up for now.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.dark.background,
  },
  list: {
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    paddingRight: 12,
    color: Colors.dark.text,
  },
  cardTimestamp: {
    fontSize: 12,
    color: Colors.dark.icon,
  },
  cardMessage: {
    fontSize: 14,
    color: Colors.dark.icon,
    lineHeight: 20,
  },
  footer: {
    marginTop: 24,
    fontSize: 14,
    color: Colors.dark.icon,
    textAlign: 'center',
  },
});
