import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { tanksDatabase } from '@/data/tanksData';

const TankDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tank = tanksDatabase.find(t => t.id === id);

  if (!tank) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">Танк не найден</h2>
          <Button onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Badge className="bg-accent text-accent-foreground text-sm px-3 py-1">
                {tank.period}
              </Badge>
              <Badge variant="outline" className="border-primary text-primary">
                {tank.year}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              {tank.name}
            </h1>
            <p className="text-xl text-muted-foreground">{tank.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="vintage-frame overflow-hidden animate-fade-in">
              <img 
                src={tank.image} 
                alt={tank.name}
                className="w-full h-auto object-cover"
              />
            </Card>

            <Card className="vintage-frame animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <h3 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                  <Icon name="Settings" size={28} />
                  Технические характеристики
                </h3>
                <div className="space-y-4">
                  {Object.entries(tank.specs).map(([key, value]) => {
                    const labels: Record<string, string> = {
                      weight: 'Боевая масса',
                      crew: 'Экипаж',
                      armor: 'Бронирование',
                      speed: 'Максимальная скорость',
                      range: 'Запас хода',
                      engine: 'Двигатель',
                      gun: 'Вооружение',
                      ammunition: 'Боекомплект'
                    };
                    
                    const icons: Record<string, string> = {
                      weight: 'Weight',
                      crew: 'Users',
                      armor: 'Shield',
                      speed: 'Gauge',
                      range: 'Compass',
                      engine: 'Cog',
                      gun: 'Crosshair',
                      ammunition: 'PackageOpen'
                    };

                    return (
                      <div key={key} className="flex justify-between items-center border-b border-border pb-3">
                        <div className="flex items-center gap-2">
                          <Icon name={icons[key]} size={18} className="text-primary" />
                          <span className="text-muted-foreground font-semibold">{labels[key]}</span>
                        </div>
                        <span className="font-bold text-foreground">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="history" className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50">
              <TabsTrigger value="history" className="font-display text-base">
                <Icon name="BookOpen" size={18} className="mr-2" />
                История создания
              </TabsTrigger>
              <TabsTrigger value="combat" className="font-display text-base">
                <Icon name="Flame" size={18} className="mr-2" />
                Боевое применение
              </TabsTrigger>
              <TabsTrigger value="production" className="font-display text-base">
                <Icon name="Factory" size={18} className="mr-2" />
                Производство
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <Card className="vintage-frame">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-display font-bold text-foreground mb-6">
                    История разработки и создания
                  </h3>
                  <p className="text-lg text-foreground leading-relaxed mb-6 whitespace-pre-line">
                    {tank.history}
                  </p>
                  
                  <div className="mt-8">
                    <h4 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                      <Icon name="GitBranch" size={24} />
                      Модификации
                    </h4>
                    <ul className="space-y-3">
                      {tank.modifications.map((mod, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                          <span className="text-foreground text-lg">{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="combat">
              <Card className="vintage-frame">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-display font-bold text-foreground mb-6">
                    Боевое применение
                  </h3>
                  <p className="text-lg text-foreground leading-relaxed whitespace-pre-line">
                    {tank.combat}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="production">
              <Card className="vintage-frame">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                    <Icon name="BarChart3" size={32} />
                    Производство и распространение
                  </h3>
                  <p className="text-lg text-foreground leading-relaxed whitespace-pre-line">
                    {tank.production}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-12 flex justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-display"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Вернуться к каталогу
            </Button>
          </div>
        </div>
      </div>

      <footer className="bg-primary text-primary-foreground py-12 border-t-4 border-accent mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-body text-primary-foreground/80">© 2024 История Танкостроения. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default TankDetail;
