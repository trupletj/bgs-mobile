import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <Text style={styles.footer}>You\'re all caught up for now.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f8f8',
  },
  list: {
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
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
  },
  cardTimestamp: {
    fontSize: 12,
    color: '#8c8c8c',
  },
  cardMessage: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  footer: {
    marginTop: 24,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
