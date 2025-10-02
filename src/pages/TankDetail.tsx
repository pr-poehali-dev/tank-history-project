import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { tanksDatabase } from '@/data/tanksData';
import { extendedTankInfo } from '@/data/tanksExtendedInfo';

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
            <div className="space-y-4">
              <Card className="vintage-frame overflow-hidden animate-fade-in">
                <img 
                  src={tank.image} 
                  alt={tank.name}
                  className="w-full h-auto object-cover"
                />
              </Card>
              
              {tank.gallery && tank.gallery.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {tank.gallery.slice(1, 3).map((img, idx) => (
                    <Card key={idx} className="vintage-frame overflow-hidden animate-fade-in" style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
                      <img 
                        src={img} 
                        alt={`${tank.name} - фото ${idx + 2}`}
                        className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Card>
                  ))}
                </div>
              )}
            </div>

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
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-muted/50">
              <TabsTrigger value="history" className="font-display text-sm md:text-base">
                <Icon name="BookOpen" size={18} className="mr-1 md:mr-2" />
                История
              </TabsTrigger>
              <TabsTrigger value="combat" className="font-display text-sm md:text-base">
                <Icon name="Flame" size={18} className="mr-1 md:mr-2" />
                Боевое применение
              </TabsTrigger>
              <TabsTrigger value="production" className="font-display text-sm md:text-base">
                <Icon name="Factory" size={18} className="mr-1 md:mr-2" />
                Производство
              </TabsTrigger>
              <TabsTrigger value="crew" className="font-display text-sm md:text-base">
                <Icon name="Users" size={18} className="mr-1 md:mr-2" />
                Экипаж
              </TabsTrigger>
              <TabsTrigger value="details" className="font-display text-sm md:text-base">
                <Icon name="Info" size={18} className="mr-1 md:mr-2" />
                Подробности
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
                  
                  {tank.productionDetails && (
                    <div className="mt-8 space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h4 className="font-bold text-foreground mb-2">Всего выпущено</h4>
                          <p className="text-2xl font-display text-accent">{tank.productionDetails.totalProduced}</p>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h4 className="font-bold text-foreground mb-2">Годы производства</h4>
                          <p className="text-2xl font-display text-accent">{tank.productionDetails.productionYears}</p>
                        </div>
                      </div>
                      
                      {tank.productionDetails.factories && (
                        <div>
                          <h4 className="text-xl font-bold text-foreground mb-3">Заводы-изготовители</h4>
                          <ul className="space-y-2">
                            {tank.productionDetails.factories.map((factory, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Icon name="Factory" size={18} className="text-primary mt-1" />
                                <span className="text-foreground">{factory}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="crew">
              <Card className="vintage-frame">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                    <Icon name="Users" size={32} />
                    Экипаж танка
                  </h3>
                  
                  {tank.crew && (
                    <div className="space-y-4">
                      {Object.entries(tank.crew).map(([role, person]) => (
                        <div key={role} className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                          <Icon name="UserCircle" size={24} className="text-primary mt-1" />
                          <div>
                            <h4 className="font-bold text-foreground capitalize">{role === 'commander' ? 'Командир' : role === 'driver' ? 'Механик-водитель' : role === 'gunner' ? 'Наводчик' : role === 'loader' ? 'Заряжающий' : 'Радист'}</h4>
                            <p className="text-muted-foreground">{person}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {tank.armor && (
                    <div className="mt-8">
                      <h4 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                        <Icon name="Shield" size={24} />
                        Детальное бронирование
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Лоб корпуса</p>
                          <p className="text-xl font-bold text-foreground">{tank.armor.front}</p>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Борт</p>
                          <p className="text-xl font-bold text-foreground">{tank.armor.side}</p>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Корма</p>
                          <p className="text-xl font-bold text-foreground">{tank.armor.rear}</p>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Башня</p>
                          <p className="text-xl font-bold text-foreground">{tank.armor.turret}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">Тип брони: {tank.armor.type}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card className="vintage-frame">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                    <Icon name="FileText" size={32} />
                    Дополнительная информация
                  </h3>
                  
                  {tank.design && (
                    <div className="mb-8">
                      <h4 className="text-2xl font-display font-bold text-foreground mb-4">Разработка</h4>
                      <div className="space-y-3">
                        <p><span className="font-bold">Разработчик:</span> {tank.design.developer}</p>
                        {tank.design.chiefDesigner && (
                          <p><span className="font-bold">Главный конструктор:</span> {tank.design.chiefDesigner}</p>
                        )}
                        <p><span className="font-bold">Период разработки:</span> {tank.design.developmentPeriod}</p>
                        <p className="text-muted-foreground">{tank.design.concept}</p>
                      </div>
                      
                      {tank.design.innovations && tank.design.innovations.length > 0 && (
                        <div className="mt-6">
                          <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                            <Icon name="Lightbulb" size={20} className="text-accent" />
                            Инновации
                          </h5>
                          <ul className="space-y-2">
                            {tank.design.innovations.map((innovation, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                                <span className="text-foreground">{innovation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {tank.trivia && (
                    <div className="mt-8">
                      <h4 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                        <Icon name="Sparkles" size={24} />
                        Интересные факты
                      </h4>
                      {tank.trivia.nickname && (
                        <p className="mb-3"><span className="font-bold">Прозвище:</span> {tank.trivia.nickname}</p>
                      )}
                      <ul className="space-y-3">
                        {tank.trivia.interestingFacts.map((fact, idx) => (
                          <li key={idx} className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                            <Icon name="Star" size={18} className="text-accent mt-1" />
                            <span className="text-foreground">{fact}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {tank.trivia.museums && tank.trivia.museums.length > 0 && (
                        <div className="mt-6">
                          <h5 className="font-bold text-foreground mb-3">Где увидеть</h5>
                          <ul className="space-y-2">
                            {tank.trivia.museums.map((museum, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Icon name="MapPin" size={18} className="text-primary mt-1" />
                                <span className="text-foreground">{museum}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {tank.modificationDetails && tank.modificationDetails.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                        <Icon name="GitBranch" size={24} />
                        Модификации (детально)
                      </h4>
                      <div className="space-y-4">
                        {tank.modificationDetails.map((mod, idx) => (
                          <div key={idx} className="p-4 bg-muted/20 rounded-lg border-l-4 border-accent">
                            <div className="flex items-center gap-2 mb-2">
                              <h5 className="font-bold text-foreground">{mod.name}</h5>
                              {mod.year && <Badge variant="outline">{mod.year}</Badge>}
                            </div>
                            <p className="text-muted-foreground mb-2">{mod.changes}</p>
                            {mod.produced && (
                              <p className="text-sm text-muted-foreground">Выпущено: {mod.produced}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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