import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const upcomingTasks = [
  {
    id: 'BG-2412',
    title: 'Ачилтын урсгалын аудит',
    description:
      'Үйлдвэрийн талбайн гаргалтын цэгүүдийг шалгаж, түр зогсолтыг бууруулах санал гаргах.',
    dueDate: '10-р сарын 12, 09:30',
    owner: 'Э. Ариунболд',
    location: 'Нисэхийн агуулах',
    status: 'Төлөвлөгдсөн',
    updatedAt: '10-р сарын 03',
  },
  {
    id: 'BG-2415',
    title: 'Шинэ жолоочдын танилцуулга',
    description:
      'Fleet багийн шинэ ажилтнуудад аюулгүй ажиллагаа болон GPS төхөөрөмжийн сургалт хийх.',
    dueDate: '10-р сарын 15, 14:00',
    owner: 'С. Мөнхзул',
    location: 'Сургалтын танхим 3',
    status: 'Бэлтгэл явж байна',
    updatedAt: '10-р сарын 04',
  },
  {
    id: 'BG-2419',
    title: 'Хүйтэн агуулахын засварын шалгалт',
    description:
      'Засварын компанийн хүргүүлсэн ажлын гүйцэтгэлийг баталгаажуулах хамтарсан үзлэг.',
    dueDate: '10-р сарын 19, 11:00',
    owner: 'Б. Баярсайхан',
    location: 'Хүйтэн агуулах A2',
    status: 'Баталгаажуулах',
    updatedAt: '10-р сарын 05',
  },
];

export default function WorkScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 px-6 py-12">
          <Box className="gap-10">
            <Box className="gap-3">
              <Heading size="3xl" className="text-typography-900">
                Ирэх ажлууд
              </Heading>
              <Text className="text-base leading-6 text-typography-600">
                Ажиллагааны багийн ирэх долоо хоногийн гол ажил, хариуцагч болон бэлтгэл төлөвийг эндээс хянана уу.
              </Text>
            </Box>

            <Box className="gap-4">
              {upcomingTasks.map((task) => (
                <Box key={task.id} className="gap-4 rounded-3xl border border-outline-700 bg-background-800 p-5">
                  <Box className="gap-1">
                    <Text className="text-xs uppercase tracking-wide text-typography-500">
                      {task.id}
                    </Text>
                    <Heading size="lg" className="text-typography-100">
                      {task.title}
                    </Heading>
                    <Text className="text-sm leading-5 text-typography-500">
                      {task.description}
                    </Text>
                  </Box>

                  <Box className="gap-4 md:flex-row md:items-start md:justify-between">
                    <Box className="gap-1">
                      <Text className="text-xs uppercase tracking-wide text-typography-500">
                        Эцсийн хугацаа
                      </Text>
                      <Text className="text-base text-typography-100">{task.dueDate}</Text>
                    </Box>

                    <Box className="gap-1">
                      <Text className="text-xs uppercase tracking-wide text-typography-500">
                        Хариуцагч
                      </Text>
                      <Text className="text-base text-typography-100">{task.owner}</Text>
                    </Box>

                    <Box className="gap-1">
                      <Text className="text-xs uppercase tracking-wide text-typography-500">
                        Байршил
                      </Text>
                      <Text className="text-base text-typography-100">{task.location}</Text>
                    </Box>
                  </Box>

                  <Box className="flex-row flex-wrap items-center justify-between gap-3">
                    <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-typography-400">
                      {task.status}
                    </Text>
                    <Text className="text-xs text-typography-500">
                      Сүүлд шинэчилсэн: {task.updatedAt}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
