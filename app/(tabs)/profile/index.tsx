import { Box } from '@/components/ui/box';
import {
  Button,
  ButtonIcon,
  ButtonText,
} from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Share2Icon } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const demoDetails = [
  { label: 'Албан тушаал', value: 'Fleet Coordinator' },
  { label: 'Байгууллага', value: 'BGS Logistics' },
  { label: 'Имэйл', value: 'kelly.peterson@bgs.dev' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="flex-1 px-6 py-12">
        <Box className="flex-1 items-center gap-12">
          <Box className="w-full items-center gap-6">
            <Heading size="3xl" className="text-typography-900">
              Таны QR код
            </Heading>
            <Text className="text-center text-base leading-6 text-typography-600">
              Доорх кодыг цааш дамжуулж, ажилтан эсвэл харилцагчид таны профайлыг шууд баталгаажуулах боломжтой.
            </Text>
          </Box>

          <Box className="items-center gap-6">
            <Box className="aspect-square w-full items-center justify-center rounded-3xl border-2 border-outline-700 ">
              <Box className="h-48 w-48 rounded-2xl border border-outline-600  p-4">
                <Box className="flex-1 flex-row flex-wrap">
                  {Array.from({ length: 150 }).map((_, index) => (
                    <Box
                      key={index}
                      className={`h-3 w-3 ${index % 2 === 0 ? 'bg-primary-500/80' : 'bg-background-900'}`}
                    />
                  ))}
                </Box>
              </Box>
              <Text className="mt-4 text-xs uppercase tracking-[0.3em] text-typography-500">
                QR PLACEHOLDER
              </Text>
            </Box>

            <Button variant="outline" size="sm" action="primary" className="px-6">
              <ButtonIcon as={Share2Icon} />
              <ButtonText>Код хуваалцах</ButtonText>
            </Button>
          </Box>

          <Box className="w-full max-w-md gap-5">
            <Heading size="lg" className="text-typography-800">
              Танилцуулга мэдээлэл
            </Heading>
            <Box className="gap-4 rounded-2xl border border-outline-700 bg-background-800 p-5">
              <Text className="text-sm font-semibold uppercase tracking-wide text-typography-500">
                Kelly Peterson
              </Text>
              <Box className="gap-3">
                {demoDetails.map((item) => (
                  <Box key={item.label} className="gap-1">
                    <Text className="text-xs uppercase tracking-wide text-typography-500">
                      {item.label}
                    </Text>
                    <Text className="text-base text-typography-100">{item.value}</Text>
                  </Box>
                ))}
              </Box>
              <Text className="text-xs text-typography-500/80">
                * Одоогоор туршилтын өгөгдөл харуулж байна. QR кодыг идэвхжүүлсний дараа бодит мэдээлэл автоматаар орлуулна.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
