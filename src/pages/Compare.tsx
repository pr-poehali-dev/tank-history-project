import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { tanksDatabase } from '@/data/tanksData';

const Compare = () => {
  const navigate = useNavigate();
  const [tank1Id, setTank1Id] = useState('t-34');
  const [tank2Id, setTank2Id] = useState('t-14');

  const tank1 = tanksDatabase.find(t => t.id === tank1Id);
  const tank2 = tanksDatabase.find(t => t.id === tank2Id);

  const specs20thCentury = tanksDatabase.filter(t => 
    t.period === 'Зарождение' || t.period === 'Довоенный' || t.period === 'ВОВ'
  );

  const specs21stCentury = tanksDatabase.filter(t => 
    t.period === 'Холодная война' || t.period === 'Современность'
  );

  const getNumericValue = (value: string): number => {
    const match = value.match(/(\d+[\.,]?\d*)/);
    return match ? parseFloat(match[1].replace(',', '.')) : 0;
  };

  const compareValue = (val1: string, val2: string, higherIsBetter: boolean = true) => {
    const num1 = getNumericValue(val1);
    const num2 = getNumericValue(val2);
    
    if (num1 === num2) return 'text-muted-foreground';
    
    if (higherIsBetter) {
      return num1 > num2 ? 'text-green-600 font-bold' : 'text-foreground';
    } else {
      return num1 < num2 ? 'text-green-600 font-bold' : 'text-foreground';
    }
  };

  const specLabels: Record<string, { label: string; icon: string; higherIsBetter: boolean }> = {
    weight: { label: 'Боевая масса', icon: 'Weight', higherIsBetter: false },
    crew: { label: 'Экипаж', icon: 'Users', higherIsBetter: false },
    armor: { label: 'Бронирование', icon: 'Shield', higherIsBetter: true },
    speed: { label: 'Макс. скорость', icon: 'Gauge', higherIsBetter: true },
    range: { label: 'Запас хода', icon: 'Compass', higherIsBetter: true },
    engine: { label: 'Двигатель', icon: 'Cog', higherIsBetter: true },
    gun: { label: 'Вооружение', icon: 'Crosshair', higherIsBetter: true },
    ammunition: { label: 'Боекомплект', icon: 'PackageOpen', higherIsBetter: true }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur border-b-2 border-accent shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground flex items-center gap-2">
              <Icon name="Shield" size={32} />
              История Танкостроения
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

      <section className="py-12 bg-gradient-to-b from-primary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-6 bg-accent text-accent-foreground text-sm px-4 py-1">
              Технический анализ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Сравнение Танков
            </h2>
            <p className="text-xl text-muted-foreground">
              Анализ эволюции бронетехники от ВОВ до современности
            </p>
          </div>

          <Card className="vintage-frame mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                <Icon name="GitCompare" size={28} />
                Выберите танки для сравнения
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-muted-foreground font-semibold mb-3">Танк 1</label>
                  <Select value={tank1Id} onValueChange={setTank1Id}>
                    <SelectTrigger className="w-full font-display text-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tanksDatabase.map(tank => (
                        <SelectItem key={tank.id} value={tank.id} className="font-display">
                          {tank.name} ({tank.year})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-muted-foreground font-semibold mb-3">Танк 2</label>
                  <Select value={tank2Id} onValueChange={setTank2Id}>
                    <SelectTrigger className="w-full font-display text-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tanksDatabase.map(tank => (
                        <SelectItem key={tank.id} value={tank.id} className="font-display">
                          {tank.name} ({tank.year})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {tank1 && tank2 && (
            <div className="grid md:grid-cols-2 gap-8 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Card className="vintage-frame">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img 
                    src={tank1.image} 
                    alt={tank1.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-accent text-accent-foreground">{tank1.period}</Badge>
                  <h3 className="text-3xl font-display font-bold text-foreground mb-2">{tank1.name}</h3>
                  <p className="text-muted-foreground mb-4">{tank1.year}</p>
                  <p className="text-foreground leading-relaxed">{tank1.description}</p>
                </CardContent>
              </Card>

              <Card className="vintage-frame">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img 
                    src={tank2.image} 
                    alt={tank2.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-accent text-accent-foreground">{tank2.period}</Badge>
                  <h3 className="text-3xl font-display font-bold text-foreground mb-2">{tank2.name}</h3>
                  <p className="text-muted-foreground mb-4">{tank2.year}</p>
                  <p className="text-foreground leading-relaxed">{tank2.description}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {tank1 && tank2 && (
            <Card className="vintage-frame animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <CardContent className="p-8">
                <h3 className="text-3xl font-display font-bold text-foreground mb-8 flex items-center gap-2">
                  <Icon name="BarChart3" size={32} />
                  Сравнительная таблица характеристик
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-accent">
                        <th className="text-left py-4 px-4 font-display text-lg text-foreground">Характеристика</th>
                        <th className="text-center py-4 px-4 font-display text-lg text-foreground">{tank1.name}</th>
                        <th className="text-center py-4 px-4 font-display text-lg text-foreground">{tank2.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(specLabels).map(([key, config]) => {
                        const val1 = tank1.specs[key as keyof typeof tank1.specs];
                        const val2 = tank2.specs[key as keyof typeof tank2.specs];
                        
                        return (
                          <tr key={key} className="border-b border-border hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Icon name={config.icon} size={20} className="text-primary" />
                                <span className="font-semibold text-foreground">{config.label}</span>
                              </div>
                            </td>
                            <td className={`text-center py-4 px-4 text-lg ${compareValue(val1, val2, config.higherIsBetter)}`}>
                              {val1}
                            </td>
                            <td className={`text-center py-4 px-4 text-lg ${compareValue(val2, val1, config.higherIsBetter)}`}>
                              {val2}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Icon name="Info" size={16} />
                    Зелёным выделены лучшие показатели в своей категории
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
            Эволюция танкостроения: ХХ vs XXI век
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="vintage-frame animate-fade-in">
              <CardContent className="p-8">
                <h4 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                  <Icon name="Calendar" size={24} />
                  Танки XX века
                </h4>
                <div className="space-y-4">
                  {specs20thCentury.map(tank => (
                    <div 
                      key={tank.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/tank/${tank.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <img 
                          src={tank.image} 
                          alt={tank.name}
                          className="w-16 h-16 object-cover rounded vintage-frame"
                        />
                        <div>
                          <h5 className="font-display font-bold text-foreground">{tank.name}</h5>
                          <p className="text-sm text-muted-foreground">{tank.year}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="border-primary">{tank.period}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="vintage-frame animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <h4 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                  <Icon name="Rocket" size={24} />
                  Танки XXI века
                </h4>
                <div className="space-y-4">
                  {specs21stCentury.map(tank => (
                    <div 
                      key={tank.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/tank/${tank.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <img 
                          src={tank.image} 
                          alt={tank.name}
                          className="w-16 h-16 object-cover rounded vintage-frame"
                        />
                        <div>
                          <h5 className="font-display font-bold text-foreground">{tank.name}</h5>
                          <p className="text-sm text-muted-foreground">{tank.year}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="border-accent">{tank.period}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="vintage-frame mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-8">
              <h4 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                <Icon name="TrendingUp" size={28} />
                Ключевые тенденции развития
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-muted/30 rounded">
                  <Icon name="Shield" size={32} className="text-primary mb-3" />
                  <h5 className="font-display font-bold text-foreground mb-2">Защита</h5>
                  <p className="text-muted-foreground text-sm">
                    От 16 мм стали (МС-1) до многослойной композитной брони с динамической защитой (Т-14)
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <Icon name="Crosshair" size={32} className="text-primary mb-3" />
                  <h5 className="font-display font-bold text-foreground mb-2">Огневая мощь</h5>
                  <p className="text-muted-foreground text-sm">
                    От 37-мм пушек до 125-мм гладкоствольных орудий с ПТУР
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <Icon name="Cpu" size={32} className="text-primary mb-3" />
                  <h5 className="font-display font-bold text-foreground mb-2">Электроника</h5>
                  <p className="text-muted-foreground text-sm">
                    От механических прицелов к цифровым СУО, тепловизорам и активной защите
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12 border-t-4 border-accent">
        <div className="container mx-auto px-4 text-center">
          <p className="font-body text-primary-foreground/80">© 2024 История Танкостроения. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Compare;
