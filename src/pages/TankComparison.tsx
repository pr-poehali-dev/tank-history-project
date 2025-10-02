import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { tanksDatabase } from '@/data/tanksData';
import { foreignTanks } from '@/data/foreignTanks';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const TankComparison = () => {
  const navigate = useNavigate();
  const [selectedRussian, setSelectedRussian] = useState(tanksDatabase[2]);
  const [selectedForeign, setSelectedForeign] = useState(foreignTanks[1]);
  const [comparisonPeriod, setComparisonPeriod] = useState('ВОВ');

  const russianTanksByPeriod = tanksDatabase.filter(t => t.period === comparisonPeriod);
  const foreignTanksByPeriod = foreignTanks.filter(t => t.period === comparisonPeriod);

  const parseSpec = (spec: string): number => {
    const match = spec.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const getComparisonData = () => {
    return [
      {
        category: 'Масса (т)',
        Россия: parseSpec(selectedRussian.specs.weight),
        Противник: parseSpec(selectedForeign.specs.weight)
      },
      {
        category: 'Броня (мм)',
        Россия: parseSpec(selectedRussian.armor?.front || selectedRussian.specs.armor),
        Противник: parseSpec(selectedForeign.armor?.front || selectedForeign.specs.armor)
      },
      {
        category: 'Скорость (км/ч)',
        Россия: parseSpec(selectedRussian.specs.speed),
        Противник: parseSpec(selectedForeign.specs.speed)
      },
      {
        category: 'Запас хода (км)',
        Россия: parseSpec(selectedRussian.specs.range),
        Противник: parseSpec(selectedForeign.specs.range)
      }
    ];
  };

  const getRadarData = () => {
    const russianArmor = parseSpec(selectedRussian.armor?.front || selectedRussian.specs.armor);
    const foreignArmor = parseSpec(selectedForeign.armor?.front || selectedForeign.specs.armor);
    
    return [
      {
        characteristic: 'Защита',
        Россия: (russianArmor / 200) * 100,
        Противник: (foreignArmor / 200) * 100,
        fullMark: 100
      },
      {
        characteristic: 'Мобильность',
        Россия: (parseSpec(selectedRussian.specs.speed) / 80) * 100,
        Противник: (parseSpec(selectedForeign.specs.speed) / 80) * 100,
        fullMark: 100
      },
      {
        characteristic: 'Огневая мощь',
        Россия: (parseSpec(selectedRussian.specs.gun.match(/\d+/)?.[0] || '76') / 152) * 100,
        Противник: (parseSpec(selectedForeign.specs.gun.match(/\d+/)?.[0] || '75') / 152) * 100,
        fullMark: 100
      },
      {
        characteristic: 'Запас хода',
        Россия: (parseSpec(selectedRussian.specs.range) / 600) * 100,
        Противnik: (parseSpec(selectedForeign.specs.range) / 600) * 100,
        fullMark: 100
      }
    ];
  };

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      'Германия': '🇩🇪',
      'США': '🇺🇸',
      'Великобритания': '🇬🇧',
      'Франция': '🇫🇷',
      'СССР': '🇷🇺',
      'Россия': '🇷🇺'
    };
    return flags[country] || '🌍';
  };

  const getCountry = (tank: typeof selectedForeign) => {
    if (tank.design?.developer?.includes('Германия')) return 'Германия';
    if (tank.design?.developer?.includes('США')) return 'США';
    if (tank.design?.developer?.includes('Великобритания')) return 'Великобритания';
    if (tank.design?.developer?.includes('Франция')) return 'Франция';
    return 'Другая';
  };

  const periods = [
    { id: 'Зарождение', name: 'Зарождение (1920-1930)' },
    { id: 'Довоенный', name: 'Довоенный (1930-1941)' },
    { id: 'ВОВ', name: 'ВОВ (1941-1945)' },
    { id: 'Холодная война', name: 'Холодная война (1946-1991)' },
    { id: 'Современность', name: 'Современность (1991-н.в.)' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur border-b-2 border-accent shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground flex items-center gap-2">
              <Icon name="GitCompare" size={32} />
              Сравнение Танков
            </h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">
            Россия/СССР против всего мира
          </h2>
          <p className="text-lg text-muted-foreground">
            Сравните характеристики советских и российских танков с техникой Германии, США, Великобритании и Франции
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Выберите период:</h3>
          <div className="flex flex-wrap gap-2">
            {periods.map(period => (
              <Button
                key={period.id}
                onClick={() => {
                  setComparisonPeriod(period.id);
                  const russianInPeriod = tanksDatabase.find(t => t.period === period.id);
                  const foreignInPeriod = foreignTanks.find(t => t.period === period.id);
                  if (russianInPeriod) setSelectedRussian(russianInPeriod);
                  if (foreignInPeriod) setSelectedForeign(foreignInPeriod);
                }}
                variant={comparisonPeriod === period.id ? 'default' : 'outline'}
                className={comparisonPeriod === period.id ? 'bg-accent text-accent-foreground' : ''}
              >
                {period.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="vintage-frame">
            <CardContent className="p-6">
              <h3 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                🇷🇺 Россия/СССР
              </h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {russianTanksByPeriod.map(tank => (
                  <button
                    key={tank.id}
                    onClick={() => setSelectedRussian(tank)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedRussian.id === tank.id 
                        ? 'border-accent bg-accent/20' 
                        : 'border-border hover:border-accent/50 bg-muted/10'
                    }`}
                  >
                    <div className="font-bold text-foreground mb-1">{tank.name}</div>
                    <div className="text-sm text-muted-foreground">{tank.year}</div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{tank.specs.gun}</Badge>
                      <Badge variant="outline">{tank.specs.armor}</Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="vintage-frame">
            <CardContent className="p-6">
              <h3 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                🌍 Зарубежные танки
              </h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {foreignTanksByPeriod.map(tank => (
                  <button
                    key={tank.id}
                    onClick={() => setSelectedForeign(tank)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedForeign.id === tank.id 
                        ? 'border-accent bg-accent/20' 
                        : 'border-border hover:border-accent/50 bg-muted/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{getCountryFlag(getCountry(tank))}</span>
                      <span className="font-bold text-foreground">{tank.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{tank.year}</div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{tank.specs.gun}</Badge>
                      <Badge variant="outline">{tank.specs.armor}</Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="stats" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="stats">
              <Icon name="BarChart3" size={18} className="mr-2" />
              Характеристики
            </TabsTrigger>
            <TabsTrigger value="radar">
              <Icon name="Target" size={18} className="mr-2" />
              Боевой профиль
            </TabsTrigger>
            <TabsTrigger value="details">
              <Icon name="FileText" size={18} className="mr-2" />
              Детали
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <Card className="vintage-frame">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                  Сравнение характеристик
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={getComparisonData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Россия" fill="#ef4444" />
                    <Bar dataKey="Противник" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="radar">
            <Card className="vintage-frame">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                  Боевой профиль (радар)
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={getRadarData()}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="characteristic" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Россия" dataKey="Россия" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                    <Radar name="Противник" dataKey="Противник" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="vintage-frame">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🇷🇺</span>
                    <div>
                      <h3 className="text-xl font-display font-bold text-foreground">{selectedRussian.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedRussian.year}</p>
                    </div>
                  </div>
                  <p className="text-foreground mb-4">{selectedRussian.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Вооружение:</span>
                      <span className="font-bold text-foreground">{selectedRussian.specs.gun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Двигатель:</span>
                      <span className="font-bold text-foreground">{selectedRussian.specs.engine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Экипаж:</span>
                      <span className="font-bold text-foreground">{selectedRussian.specs.crew}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4"
                    onClick={() => navigate(`/tank/${selectedRussian.id}`)}
                  >
                    Подробнее
                  </Button>
                </CardContent>
              </Card>

              <Card className="vintage-frame">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{getCountryFlag(getCountry(selectedForeign))}</span>
                    <div>
                      <h3 className="text-xl font-display font-bold text-foreground">{selectedForeign.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedForeign.year}</p>
                    </div>
                  </div>
                  <p className="text-foreground mb-4">{selectedForeign.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Вооружение:</span>
                      <span className="font-bold text-foreground">{selectedForeign.specs.gun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Двигатель:</span>
                      <span className="font-bold text-foreground">{selectedForeign.specs.engine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Экипаж:</span>
                      <span className="font-bold text-foreground">{selectedForeign.specs.crew}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4"
                    onClick={() => navigate(`/tank/${selectedForeign.id}`)}
                  >
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="vintage-frame">
          <CardContent className="p-8">
            <h3 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <Icon name="Scale" size={28} />
              Итоговое сравнение
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-red-500/10 rounded-lg border-2 border-red-500/30">
                <div className="text-4xl font-display font-bold text-red-500 mb-2">
                  {selectedRussian.name.split(' ')[0]}
                </div>
                <p className="text-sm text-muted-foreground">СССР/Россия</p>
              </div>
              <div className="flex items-center justify-center">
                <Icon name="Swords" size={64} className="text-accent" />
              </div>
              <div className="text-center p-6 bg-blue-500/10 rounded-lg border-2 border-blue-500/30">
                <div className="text-4xl font-display font-bold text-blue-500 mb-2">
                  {selectedForeign.name.split(' ')[0]}
                </div>
                <p className="text-sm text-muted-foreground">{getCountry(selectedForeign)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="bg-primary text-primary-foreground py-12 border-t-4 border-accent mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-body text-primary-foreground/80">© 2024 История Танкостроения. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default TankComparison;
