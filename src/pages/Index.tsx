import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { tanksDatabase, periods } from '@/data/tanksData';

const Index = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const filteredTanks = selectedPeriod === 'all' 
    ? tanksDatabase 
    : tanksDatabase.filter(tank => tank.period === selectedPeriod);

  const timeline = [
    { year: '1920', event: 'Начало разработки первых советских танков' },
    { year: '1927', event: 'Принятие на вооружение танка МС-1' },
    { year: '1931', event: 'Создание танка БТ-2 на базе американского Christie' },
    { year: '1940', event: 'Запуск в серийное производство Т-34' },
    { year: '1943', event: 'Появление тяжёлых танков серии ИС' },
    { year: '1947', event: 'Начало послевоенной модернизации бронетехники' }
  ];

  const historyPeriods = [
    {
      title: 'Зарождение (1920-1930)',
      description: 'Первые шаги советского танкостроения. Создание экспериментальных образцов и освоение зарубежных технологий.',
      icon: 'Lightbulb'
    },
    {
      title: 'Довоенный период (1930-1941)',
      description: 'Массовое производство лёгких и средних танков. Разработка революционного Т-34 и тяжёлых танков КВ.',
      icon: 'Factory'
    },
    {
      title: 'Великая Отечественная (1941-1945)',
      description: 'Эвакуация заводов на восток. Массовое производство Т-34 и создание тяжёлых танков ИС для прорыва обороны.',
      icon: 'Flame'
    },
    {
      title: 'Послевоенная эра (1945-1960)',
      description: 'Модернизация военной техники с учётом опыта войны. Разработка новых концепций бронетехники.',
      icon: 'Sparkles'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur border-b-2 border-accent shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground flex items-center gap-2">
              <Icon name="Shield" size={32} />
              История Танкостроения
            </h1>
            <div className="hidden md:flex gap-6">
              <button
                onClick={() => navigate('/')}
                className="text-primary-foreground hover:text-accent-foreground transition-colors font-display font-semibold"
              >
                Главная
              </button>
              <button
                onClick={() => navigate('/comparison')}
                className="text-primary-foreground hover:text-accent-foreground transition-colors font-display font-semibold flex items-center gap-2"
              >
                <Icon name="GitCompare" size={20} />
                Россия vs Мир
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/20 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-accent text-accent-foreground text-sm px-4 py-1">
              Архивный портал
            </Badge>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              Летопись Российского Танкостроения
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 font-body">
              От первых бронированных машин до легендарных танков Великой Отечественной войны. 
              Исследуйте историю инженерной мысли и военного мастерства.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/compare')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-display"
              >
                <Icon name="GitCompare" size={20} className="mr-2" />
                Сравнить танки
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 font-display"
                onClick={() => {
                  const element = document.getElementById('catalog');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Icon name="Archive" size={20} className="mr-2" />
                Каталог техники
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Периоды Развития
            </h3>
            <p className="text-muted-foreground text-lg">Ключевые этапы истории танкостроения</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {historyPeriods.map((period, idx) => (
              <Card key={idx} className="vintage-frame bg-card hover:shadow-xl transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="mb-4 text-primary">
                    <Icon name={period.icon} size={40} />
                  </div>
                  <h4 className="font-display font-bold text-xl mb-3 text-foreground">{period.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{period.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Icon name="Calendar" size={36} />
              Хронология
            </h3>
            <p className="text-muted-foreground text-lg">Важнейшие даты в истории</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-4 border-accent pl-8 space-y-8">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative animate-slide-in" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className="absolute -left-10 w-6 h-6 rounded-full bg-accent border-4 border-background"></div>
                  <div className="vintage-frame bg-card p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-baseline gap-4 mb-2">
                      <Badge className="bg-primary text-primary-foreground font-display text-lg px-3 py-1">
                        {item.year}
                      </Badge>
                    </div>
                    <p className="text-foreground text-lg leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Icon name="Archive" size={36} />
              Каталог Техники
            </h3>
            <p className="text-muted-foreground text-lg mb-6">От первых образцов до современных танков</p>
            
            <div className="flex justify-center items-center gap-4 mb-8">
              <span className="text-muted-foreground font-semibold">Фильтр по периоду:</span>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-64 font-display">
                  <SelectValue placeholder="Выберите период" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map(period => (
                    <SelectItem key={period.id} value={period.id} className="font-display">
                      {period.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredTanks.map((tank, idx) => (
              <Card key={idx} className="vintage-frame overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img 
                    src={tank.image} 
                    alt={tank.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-display font-bold text-2xl text-foreground">{tank.name}</h4>
                    <Badge variant="outline" className="border-accent text-accent font-display">{tank.year}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{tank.description}</p>
                  <div className="space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Масса:</span>
                      <span className="font-semibold text-foreground">{tank.specs.weight}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Экипаж:</span>
                      <span className="font-semibold text-foreground">{tank.specs.crew}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Броня:</span>
                      <span className="font-semibold text-foreground">{tank.specs.armor}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate(`/tank/${tank.id}`)}
                    className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-display"
                  >
                    Подробнее
                    <Icon name="ChevronRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12 border-t-4 border-accent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                <Icon name="Shield" size={24} />
                История Танкостроения
              </h4>
              <p className="text-primary-foreground/80">
                Архивный портал, посвящённый развитию российского и советского танкостроения.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold text-xl mb-4">Разделы</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li className="hover:text-accent-foreground cursor-pointer transition-colors">Главная</li>
                <li className="hover:text-accent-foreground cursor-pointer transition-colors">История</li>
                <li className="hover:text-accent-foreground cursor-pointer transition-colors">Хронология</li>
                <li className="hover:text-accent-foreground cursor-pointer transition-colors">Модели</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-xl mb-4">Контакты</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  info@tankhistory.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  Москва, Россия
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
            <p className="font-body">© 2024 История Танкостроения. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;