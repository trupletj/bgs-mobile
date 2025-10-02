import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { Search } from 'lucide-react-native';
import { ComponentProps, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

type ServiceItem = {
  key: string;
  title: string;
  description: string;
  iconName: MaterialIconName;
  iconBackground: string;
  iconColor: string;
};

type ServiceSection = {
  title: string;
  emoji: string;
  services: ServiceItem[];
};

const SERVICE_SECTIONS: ServiceSection[] = [
  {
    title: 'Operations',
    emoji: '⚙️',
    services: [
      {
        key: 'fleet-management',
        title: 'Fleet Management',
        description: 'Real-time tracking and assignment for vehicles.',
        iconName: 'local-shipping',
        iconBackground: 'rgba(56, 189, 248, 0.16)',
        iconColor: '#38BDF8',
      },
      {
        key: 'inventory',
        title: 'Inventory',
        description: 'Monitor stock levels and automatic reordering.',
        iconName: 'inventory',
        iconBackground: 'rgba(251, 191, 36, 0.18)',
        iconColor: '#FACC15',
      },
    ],
  },
  {
    title: 'Customer',
    emoji: '🤝',
    services: [
      {
        key: 'support-center',
        title: 'Support Center',
        description: 'Centralized ticketing and customer support tools.',
        iconName: 'support-agent',
        iconBackground: 'rgba(244, 114, 182, 0.16)',
        iconColor: '#F472B6',
      },
      {
        key: 'feedback',
        title: 'Feedback',
        description: 'Collect sentiment and service insights instantly.',
        iconName: 'thumb-up-alt',
        iconBackground: 'rgba(34, 197, 94, 0.18)',
        iconColor: '#4ADE80',
      },
    ],
  },
  {
    title: 'Finance',
    emoji: '💼',
    services: [
      {
        key: 'billing',
        title: 'Billing',
        description: 'Automated invoicing and payment reconciliation.',
        iconName: 'receipt-long',
        iconBackground: 'rgba(139, 92, 246, 0.18)',
        iconColor: '#A855F7',
      },
      {
        key: 'analytics',
        title: 'Analytics',
        description: 'Dashboards to forecast growth and revenue.',
        iconName: 'insights',
        iconBackground: 'rgba(248, 113, 113, 0.18)',
        iconColor: '#F87171',
      },
    ],
  },
];

export default function ServicesScreen() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);

    return () => clearTimeout(timer);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!normalizedQuery) {
      return SERVICE_SECTIONS;
    }

    return SERVICE_SECTIONS.map((section) => {
      const services = section.services.filter((service) => {
        const target = `${service.title} ${service.description}`.toLowerCase();
        return target.includes(normalizedQuery);
      });

      return { ...section, services };
    }).filter((section) => section.services.length > 0);
  }, [normalizedQuery]);

  const hasResults = filteredSections.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Search color={Colors.dark.icon} size={20} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search services"
            placeholderTextColor={Colors.dark.icon}
            style={styles.searchInput}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={Colors.dark.primary} size="small" />
          </View>
        ) : (
          <View style={styles.sectionsContainer}>
            {hasResults ? (
              filteredSections.map((section) => (
                <View key={section.title} style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    {section.emoji} {section.title}
                  </Text>
                  <View style={styles.grid}>
                    {section.services.map((service) => (
                      <Link
                        key={service.key}
                        href={{ pathname: '/services/[key]', params: { key: service.key } }}
                        asChild>
                        <Pressable style={styles.card} accessibilityRole="button">
                          <View
                            style={[
                              styles.cardIcon,
                              { backgroundColor: service.iconBackground },
                            ]}>
                            <MaterialIcons
                              name={service.iconName}
                              size={22}
                              color={service.iconColor}
                            />
                          </View>
                          <Text style={styles.cardTitle}>{service.title}</Text>
                          <Text style={styles.cardDescription}>{service.description}</Text>
                        </Pressable>
                      </Link>
                    ))}
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyState}>No services match that search yet.</Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.dark.text,
  },
  loadingContainer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  sectionsContainer: {
    gap: 32,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  card: {
    width: '45%',
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.dark.icon,
  },
  emptyState: {
    textAlign: 'center',
    color: Colors.dark.icon,
    fontSize: 16,
  },
});
